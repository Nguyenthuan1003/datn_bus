<?php

namespace App\Http\Controllers;

use App\Events\HoldSeatEvent;
use App\Models\Location;
use App\Models\ParentLocation;
use App\Models\Seat;
use App\Models\TicketOrder;
use App\Models\TypeCar;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Route;
use App\Models\Car;
use App\Services\GetSeatDataService;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;

class TripController extends Controller
{
    private $getSeatDataService;

    public function __construct(GetSeatDataService $getSeatDataService)
    {
        $this->getSeatDataService = $getSeatDataService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $currentDateTime = \Carbon\Carbon::now();
            $allTrips = Trip::with(['car', 'route'])
                ->get();
            $notStartedTrips = Trip::with(['car', 'route'])
                ->where('start_time', '>', $currentDateTime)
                ->get();
            $startedTrips = Trip::with(['car', 'route'])
                ->where('start_time', '<=', $currentDateTime)
                ->get();

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                "status" => "success",
                "not_started_trips" => $notStartedTrips,
                "started_trips" => $startedTrips,
                'all_trips' => $allTrips
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                //                'error' => $e->getMessage(),
                "status" => "fail"
            ]);
        }
    }

    /**
     * Display information dependencies for create.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        try {
            $cars = Car::where('status', 1)->get();
            $routes = Route::where('status', 1)->get();

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'cars' => $cars,
                'routes' => $routes,
                "status" => "success"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                //                'error' => $e->getMessage(),
                "status" => "fail"
            ]);
        }
    }

    /**
     * Get start location and end location based on route
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLocationsForRoute($routeId)
    {
        try {
            $route = Route::find($routeId);

            if (!$route) {
                return response()->json([
                    'message' => 'Tuyến đi không tồn tại',
                    "status" => "fail"
                ]);
            }

            //            $start_locations = ParentLocation::with('location')->find($route->start_location);
            //            $end_locations = ParentLocation::with('location')->find($route->end_location);
            $start_locations = ParentLocation::with('location')->where('name', $route->start_location)->first();
            $end_locations = ParentLocation::with('location')->where('name', $route->end_location)->first();

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'start_locations' => $start_locations,
                'end_locations' => $end_locations,
                "status" => "success"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                //                'error' => $e->getMessage(),
                "status" => "fail"
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'car_id' => 'required|integer|exists:cars,id',
                //                'drive_id' => 'required|integer|exists:users,id',
                //                'assistant_car_id' => 'required|integer|exists:users,id',
                //                'start_date' => 'required|date|after_or_equal:today',
                //                'start_time' => 'required|date_format:H:i',
                'start_time' => 'required|date|after:' . now()->addSecond(),
                'start_location' => 'required|string|max:255|exists:locations,name',
                'status' => 'required|integer',
                'trip_price' => 'required|numeric|max:99999999',
                'end_location' => 'required|string|max:255|exists:locations,name', // data bảng locations phải lưu cả 1 tên parent-location nếu ko có location con không sẽ lỗi validate
                'interval_trip' => 'required|numeric|min:0|max:100',
                'route_id' => 'required|integer|exists:routes,id',
                'loop' => 'nullable|numeric|min:1'
            ]);

            $route = Route::find($request->input('route_id'));

            if ($route->status == 0) {
                return response()->json([
                    'message' => 'Tuyến đường này không hoạt động.',
                    "status" => "fail"
                ]);
            }

            $startLocation = Location::with('parentLocation')->where('name', $request->input('start_location'))->first();
            $endLocation = Location::with('parentLocation')->where('name', $request->input('end_location'))->first();

            if ($startLocation->parentLocation->name != $route->start_location) {
                return response()->json([
                    'message' => 'Thông tin về vị trí bắt đầu không trùng khớp với tuyến đường!',
                    "status" => "fail"
                ]);
            }

            if ($endLocation->parentLocation->name != $route->end_location) {
                return response()->json([
                    'message' => 'Thông tin về vị trí kết thúc không trùng khớp với tuyến đường!',
                    "status" => "fail"
                ]);
            }

            //            validate tạm hạn chế trùng chuyến xe cùng 1 thời điểm
            $isValid = Trip::where('car_id', $request->input('car_id'))
                ->where('start_time', $request->input('start_time'))
                ->first();

            if ($isValid) {
                return response()->json([
                    'message' => 'Xe này đã có chuyến đi vào giờ này!',
                    "status" => "fail"
                ]);
            }

            //          Save data:
            if ($request->input('loop') && $request->input('loop') > 1 && $request->input('interval_trip') < 12) {
                $trips = [];
                for ($i = 0; $i < $request->input('loop'); $i++) {
                    $trip = new Trip();
                    $trip->car_id = $request->input('car_id');
                    //                    $trip->drive_id = $request->input('drive_id');
                    //                    $trip->assistant_car_id = $request->input('assistant_car_id');
                    $trip->start_location = $request->input('start_location');
                    $trip->status = $request->input('status');
                    $trip->trip_price = $request->input('trip_price');
                    $trip->end_location = $request->input('end_location');
                    $trip->interval_trip = $request->input('interval_trip');
                    $trip->route_id = $request->input('route_id');
                    $trip->start_time = \Carbon\Carbon::createFromFormat('Y-m-d\TH:i:sP', $request->input('start_time'))
                        ->addDays($i)
                        ->toDateTimeString();
                    $trip->save();
                    $trips[] = $trip;
                }

                return response()->json([
                    'message' => 'Thêm mới thành công',
                    'trips' => $trips,
                    "status" => "success"
                ]);
            } else {
                $trip = new Trip();
                $trip->car_id = $request->input('car_id');
                //                $trip->drive_id = $request->input('drive_id');
                //                $trip->assistant_car_id = $request->input('assistant_car_id');
                $trip->start_location = $request->input('start_location');
                $trip->status = $request->input('status');
                $trip->trip_price = $request->input('trip_price');
                $trip->end_location = $request->input('end_location');
                $trip->interval_trip = $request->input('interval_trip');
                $trip->route_id = $request->input('route_id');
                $trip->start_time = $request->input('start_time');
                $trip->save();

                return response()->json([
                    'message' => 'Thêm mới thành công',
                    'trip' => $trip,
                    "status" => "success"
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                "status" => "fail"
                //                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $trip = Trip::with(['car', 'route'])->find($id);

            if (!$trip) {
                return response()->json([
                    'message' => 'Chuyến đi không tồn tại',
                    "status" => "fail"
                ]);
            }

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                "status" => "success",
                'trip' => $trip
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                "status" => "fail",
                //                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $trip = Trip::find($id);

            if (!$trip) {
                return response()->json([
                    'message' => 'Chuyến đi không tồn tại',
                    "status" => "fail"
                ]);
            }

            //            chỉ được cập nhật thông tin trước giờ khởi hành
            //            đã có bill thì không được cập nhật thông tin nữa: nếu đổi xe sẽ ảnh hưởng vé. đổi cái khác thì ảnh hưởng tới khách hàng
            //            chưa có bill thì được đổi thông tin

            if (!(\Carbon\Carbon::parse($trip->start_time, 'Asia/Ho_Chi_Minh')->isAfter(\Carbon\Carbon::now('Asia/Ho_Chi_Minh')))) {
                return response()->json([
                    'message' => 'Chuyến đi đã hết hạn điều chỉnh. Không thể cập nhật thông tin.',
                    "status" => "fail"
                ]);
            } else {


                $request->validate([
                    'car_id' => 'required|integer|exists:cars,id',
                    //                    'drive_id' => 'required|integer|max:255|exists:users,id',
                    //                    'assistant_car_id' => 'required|integer|max:255|exists:users,id',
                    //                    'start_date' => 'required|date|after_or_equal:today',
                    //                    'start_time' => 'required|date_format:H:i',
                    'start_time' => 'required|date|after:' . now()->addSecond(),
                    'start_location' => 'required|string|max:255|exists:locations,name',
                    'status' => 'required|integer',
                    'trip_price' => 'required|numeric|max:99999999',
                    'end_location' => 'required|string|max:255|exists:locations,name', // data bảng locations phải lưu cả 1 tên parent-location nếu ko có location con không sẽ lỗi validate
                    'interval_trip' => 'required|numeric|min:0|max:100',
                    'route_id' => 'required|integer|exists:routes,id'
                ]);

                $route = Route::find($request->input('route_id'));

                if ($route->status == 0) {
                    return response()->json([
                        'message' => 'Tuyến đường này không hoạt động.',
                        "status" => "fail"
                    ]);
                }

                $startLocation = Location::with('parentLocation')->where('name', $request->input('start_location'))->first();
                $endLocation = Location::with('parentLocation')->where('name', $request->input('end_location'))->first();

                if ($startLocation->parentLocation->name != $route->start_location) {
                    return response()->json([
                        'message' => 'Thông tin về vị trí bắt đầu không trùng khớp với tuyến đường!',
                        "status" => "fail"
                    ]);
                }

                if ($endLocation->parentLocation->name != $route->end_location) {
                    return response()->json([
                        'message' => 'Thông tin về vị trí kết thúc không trùng khớp với tuyến đường!',
                        "status" => "fail"
                    ]);
                }

                //            validate tạm hạn chế trùng chuyến xe cùng 1 thời điểm
                $isValid = Trip::where('car_id', $request->input('car_id'))
                    ->where('start_time', $request->input('start_time'))
                    ->whereNotIn('id', [$id])
                    ->first();

                if ($isValid) {
                    return response()->json([
                        'message' => 'Xe này đã có chuyến đi vào giờ này!',
                        "status" => "fail"
                    ]);
                }

                if ($trip->bill()->exists() || $trip->comment()->exists()) { //nếu comment chỉ giành cho khi đi xong mới được đánh giá thì có thể xóa điều kiện comment
                    $trip->status = $request->input('status');
                    $trip->save();

                    return response()->json([
                        'message' => 'Cập nhật thông tin thành công.',
                        'warning' => 'Chỉ có thể cập nhật thông tin trạng thái chuyến đi đối với chuyến đi đã được đặt vé/đánh giá.',
                        'trip' => $trip,
                        "status" => "success"
                    ]);
                } else {
                    $trip->car_id = $request->input('car_id');
                    $trip->start_location = $request->input('start_location');
                    $trip->status = $request->input('status');
                    $trip->trip_price = $request->input('trip_price');
                    $trip->end_location = $request->input('end_location');
                    $trip->interval_trip = $request->input('interval_trip');
                    $trip->route_id = $request->input('route_id');
                    $trip->start_time = $request->input('start_time');
                    $trip->save();

                    return response()->json([
                        'message' => 'Cập nhật thành công chuyến đi',
                        "status" => "success",
                        'trip' => $trip
                    ]);
                }
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                "status" => "fail",
//                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $trip = Trip::find($id);

            if (!$trip) {
                return response()->json([
                    'message' => 'Chuyến đi không tồn tại',
                    "status" => "fail"
                ]);
            }

            if ($trip->bill()->exists()) {
                return response()->json([
                    'message' => 'Chuyến đi đã được đặt vé, không được xóa. Nếu có thể hãy hủy/xóa vé để có thể xóa chuyến xe này.',
                    "status" => "fail"
                ]);
            }

            if ($trip->comment()->exists()) {
                return response()->json([
                    'message' => 'Chuyến đi đã được đánh giá/bình luận, không được xóa. Nếu có thể hãy hủy/xóa bình luận để có thể xóa chuyến xe này.',
                    "status" => "fail"
                ]);
            }

            $trip->delete();

            return response()->json([
                'message' => 'Xóa chuyến đi thành công',
                "status" => "success"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                "status" => "fail"
                //                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Get trip data frontend for select trip.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function tripSelect($id)
    {
        try {
            $tripData = Trip::with(['car', 'route'])->find($id);

            //            mess này của tìm kiếm ngoài frontend nên sẽ lệch 4 tiếng
            if (!$tripData || \Carbon\Carbon::parse($tripData->start_time)->subHours(4)->isBefore(now())) {
                return response()->json([
                    'message' => 'Chuyến đi không tồn tại',
                    "status" => "fail"
                ]);
            }

            // get data type car to each show seats
            $type_car = TypeCar::find($tripData->car->id_type_car);

            //seats and status seats
            $seats = Seat::where('car_id', $tripData->car_id)->get()->toArray();
            $orderedSeats = TicketOrder::join('bills', 'ticket_orders.bill_id', '=', 'bills.id')
                ->join('trips', 'bills.trip_id', '=', 'trips.id')
                ->where('trips.id', $id)
                ->select('ticket_orders.code_seat', 'bills.created_at', 'bills.status_pay')
                ->get();

            foreach ($seats as &$seat) {
                $seat['status'] = 0;
                foreach ($orderedSeats as $orderedSeat) {
                    if (
                        $seat['code_seat'] == $orderedSeat->code_seat &&
                        ($orderedSeat->status_pay == 1 || ($orderedSeat->status_pay == 0 && !$orderedSeat->created_at->addMinutes(20)->isBefore(now())))
                    ) {
                        //                        dd($orderedSeat->created_at->addMinutes(20));
                        $seat['status'] = 1;
                    }
                }
            }

            //  get locations for router
            $pickupLocations = ParentLocation::with('location')->where('name', $tripData->route->start_location)->first();
            $payLocation = ParentLocation::with('location')->where('name', $tripData->route->end_location)->first();

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'type_car' => $type_car,
                'trip' => $tripData,
                'seats' => $seats,
                'pickup_location' => $pickupLocations,
                'pay_location' => $payLocation,
                "status" => "success",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                "status" => "fail"
                //                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Get trip data frontend for select trip.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function tripDetail($id)
    {
        try {
            $tripData = Trip::with(['car', 'route'])->find($id);

            if (!$tripData) {
                return response()->json([
                    'message' => 'Chuyến đi không tồn tại',
                    "status" => "fail"
                ]);
            }

            // get data type car to each show seats
            $type_car = TypeCar::find($tripData->car->id_type_car);

            //seats and status seats
            $seats = Seat::where('car_id', $tripData->car_id)->get()->toArray();
            $orderedSeats = TicketOrder::join('bills', 'ticket_orders.bill_id', '=', 'bills.id')
                ->join('trips', 'bills.trip_id', '=', 'trips.id')
                ->where('trips.id', $id)
                ->select('ticket_orders.code_seat', 'bills.created_at', 'bills.status_pay')
                ->get();

            $seat_count_booked = 0;
            $seat_count_pending = 0;

            foreach ($seats as &$seat) {
                $seat['status'] = 'unbooked';
                $seat['count_unbooked'] = 0;
                foreach ($orderedSeats as $orderedSeat) {
                    if ($seat['code_seat'] == $orderedSeat->code_seat) {
                        if ($orderedSeat->status_pay == 1) {
                            $seat['status'] = 'booked';
                            $seat_count_booked++;
                        } elseif ($orderedSeat->status_pay == 0 && !$orderedSeat->created_at->addMinutes(20)->isBefore(now())) {
                            $seat['status'] = 'pending';
                            $seat_count_pending++;
                        }

                        if ($orderedSeat->status_pay == 0 && $orderedSeat->created_at->addMinutes(20)->isBefore(now())) {
                            $seat['count_unbooked'] += 1;
                        }
                    }
                }
            }

            $seat_count_unbooked = $type_car->total_seat - $seat_count_booked - $seat_count_pending;

            //  get locations for router
            $pickupLocations = ParentLocation::with('location')->where('name', $tripData->route->start_location)->first();
            $payLocation = ParentLocation::with('location')->where('name', $tripData->route->end_location)->first();

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'type_car' => $type_car,
                'trip' => $tripData,
                'seats' => $seats,
                'pickup_location' => $pickupLocations,
                'pay_location' => $payLocation,
                'seat_count_booked' => $seat_count_booked,
                'seat_count_unbooked' => $seat_count_unbooked,
                'seat_count_pending' => $seat_count_pending,
                "status" => "success",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                "status" => "fail"
                //                'error' => $e->getMessage()
            ]);
        }
    }

    public function indexTripStatistical(Request $request)
    {
        try {
            $request->validate([
                'start_time' => 'required|date',
                'end_time' => 'required|date',
            ]);

            $trips = Trip::with(['car', 'route'])
                ->where('start_time', '>=', $request->input('start_time'))
                ->where('start_time', '<=', $request->input('end_time'))
                ->get()->toArray();

            foreach ($trips as &$trip) {
                $trip['total_seat'] = TypeCar::find($trip['car']['id_type_car'])->total_seat;
                $trip['seat_count_booked'] = 0;
                $trip['seat_count_pending'] = 0;
                $seats = Seat::where('car_id', $trip['car_id'])->get()->toArray();
                $orderedSeats = TicketOrder::join('bills', 'ticket_orders.bill_id', '=', 'bills.id')
                    ->join('trips', 'bills.trip_id', '=', 'trips.id')
                    ->where('trips.id', $trip['id'])
                    ->select('ticket_orders.code_seat', 'bills.created_at', 'bills.status_pay')
                    ->get();


                foreach ($seats as &$seat) {
                    foreach ($orderedSeats as $orderedSeat) {
                        if ($seat['code_seat'] == $orderedSeat->code_seat) {
                            if ($orderedSeat->status_pay == 1) {
                                $trip['seat_count_booked']++;
                            } elseif ($orderedSeat->status_pay == 0 && !$orderedSeat->created_at->addMinutes(20)->isBefore(now())) {
                                $trip['seat_count_pending']++;
                            }
                        }
                    }
                }

                $trip['seat_count_unbooked'] = $trip['total_seat'] - $trip['seat_count_booked'] - $trip['seat_count_pending'];
                $trip['fill_rate'] = round($trip['seat_count_booked'] / $trip['total_seat'], 2) * 100;
                $trip['fill_pending_rate'] = round($trip['seat_count_pending'] / $trip['total_seat'], 2) * 100;
                $trip['fill_unbooked_rate'] = 100 - $trip['fill_rate'] - $trip['fill_pending_rate'];
            }

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'trips' => $trips,
                "status" => "success",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                //                'error' => $e->getMessage(),
                "status" => "fail"
            ]);
        }
    }

    public function searchTrip(Request $request)
    {
        try {
            // Validate the incoming request data
            $request->validate([
                'start_location' => 'required|string',
                'end_location' => 'required|string',
                'start_time' => 'required',
                'ticket_count' => 'required'
            ]);

            $startLocation = $request->input('start_location');
            $endLocation = $request->input('end_location');
            $startTime = substr($request->input('start_time'), 0, 10); // type string
            $ticketCount = $request->input('ticket_count');

            // validate location
            if ($startLocation == $endLocation) {
                return response()->json(['error' => 'Địa điểm bắt đầu và kết thúc không thể giống nhau'], 500);
            }

            // Set the default timezone to use for all Carbon instances
            Carbon::setLocale('Asia/Ho_Chi_Minh');
            // Parse the start time string into a Carbon instance
            $startTime = Carbon::createFromFormat('Y-m-d', $startTime, 'Asia/Ho_Chi_Minh');

            // Get the current date
            $currentDate = Carbon::now('Asia/Ho_Chi_Minh');

            // Format the start time as a string to match the database format
            // if same day
            if ($startTime->isSameDay($currentDate)) {
                // chỉnh giờ theo nghiệp vụ không đặt chuyến trước giờ xuất phát 4h
                $startTime = $startTime->addHours(4);
                $startTimeDate = $startTime->toDateString();
                $startTimeTime = $startTime->toTimeString();
                $startTime = $startTime->toDateTimeString();
            } else {
                // validate $startTime cant in the past
                if ($startTime < $currentDate) {
                    return response()->json(['error' => 'start_time không thể là thời gian đã qua'], 500);
                }
                // if future
                $startTime = $startTime->startOfDay();
                $startTimeDate = $startTime->toDateString();
                $startTimeTime = $startTime->toTimeString();
                $startTime = $startTime->toDateTimeString();
            }

            $isRouteExist = Route::where('status', true)
                ->where('start_location', $startLocation)
                ->where('end_location', $endLocation)
                ->get();

            $parentLocationImage = ParentLocation::where('name', $startLocation)
                ->orWhere('name', $endLocation)
                ->orderBy('name', 'asc')
                ->select('id', 'name', 'image')
                ->get();

            $totalTripData = collect();
            $totalMoreTrips = collect();
            // Check if route exists
            if ($isRouteExist->isNotEmpty()) {
                // Iterate over each route
                $isRouteExist->each(function ($route) use (&$totalTripData, &$totalMoreTrips, $startTime, $startTimeDate, $startTimeTime) {
                    // Retrieve trips associated with the current route
                    $trips = Trip::where('route_id', $route->id)
                        ->where('status', true)
                        ->whereDate('start_time', '=', $startTimeDate)
                        ->whereTime('start_time', '>=', $startTimeTime)
                        ->with(['car.typeCar' => function ($query) {
                            // Select the total_seat from the associated type_car relationship
                            $query->select('id', 'name', 'total_seat', 'type_seats');
                        }])
                        ->with(['bill' => function ($query) {
                            // Select the total_seat from the associated bill relationship
                            $query->select('trip_id', 'total_seat as total_seat_used', 'seat_id as seat_code_used', 'created_at');
                        }])
                        ->with(['route' => function ($query) {
                            $query->select('id', 'name as route_name');
                        }])
                        ->get();

                    $moreTrips = Trip::where('route_id', $route->id)
                        ->where('status', true)
                        ->where('start_time', '>=', $startTime)
                        ->with(['car.typeCar' => function ($query) {
                            // Select the total_seat from the associated type_car relationship
                            $query->select('id', 'name', 'total_seat', 'type_seats');
                        }])
                        ->with(['bill' => function ($query) {
                            // Select the total_seat from the associated bill relationship
                            $query->select('trip_id', 'total_seat as total_seat_used', 'seat_id as seat_code_used', 'created_at');
                        }])
                        ->with(['route' => function ($query) {
                            $query->select('id', 'name as route_name');
                        }])
                        ->get();

                    // Append trips to the totalTripData collection
                    $totalTripData = $totalTripData->merge($trips);
                    $totalMoreTrips = $totalMoreTrips->merge($moreTrips);
                });

                // for trip data
                $formatedData = [];

                $filteredTrips = $totalTripData->map(function ($trip) use ($ticketCount) {
                    $trip['total_seat'] = optional(optional($trip->car)->typeCar)->total_seat;
                    $trip['total_seat_used'] = collect($trip->bill)->sum('total_seat_used') ?? 0;
                    // Pluck 'seat_code_used' from each bill and flatten the array
                    $seatCodes = collect($trip->bill)->pluck('seat_code_used')->flatten()->toArray();
                    // Decode JSON strings to arrays
                    $seatCodes = array_map('json_decode', $seatCodes);
                    // Flatten again to merge all seat codes into a single array
                    $trip['array_seat_code_used'] = collect($seatCodes)->flatten()->toArray();

                    // Check if totalSeat and totalSeatUsed are not null before comparing
                    if ($trip['total_seat'] !== null && $trip['total_seat_used'] !== null) {
                        // Calculate the available seats
                        $trip['total_seat_available'] = $trip['total_seat'] - $trip['total_seat_used'];

                        if ($trip['total_seat_available'] >= $ticketCount) {
                            return $trip;
                        }
                    }
                })->filter();

                foreach ($filteredTrips as $trip) {
                    $startLocationImage = $parentLocationImage->first(function ($location) use ($startLocation) {
                        return $location->name === $startLocation;
                    });
                    $endLocationImage = $parentLocationImage->first(function ($location) use ($endLocation) {
                        return $location->name === $endLocation;
                    });

                    // format car image url
                    $carImageName = $trip->car->image ?? "";
                    if ($trip->car->image) {
                        if ($trip->car->image[0] !== "/") {
                            $carImageName = "/" . $trip->car->image ?? '';
                        }
                        $carImageName = "http://" . $request->getHttpHost() . $carImageName;
                    }

                    $formatedData[] = [
                        // trip
                        "trip_id" => $trip->id,
                        "start_time" => $trip->start_time,
                        "route_name" => $trip->route->route_name,
                        "start_location_parent" => $startLocation,
                        "start_location_parent_image" => "http://" . $request->getHttpHost() . "/" . $startLocationImage->image,
                        "end_location_parent" => $endLocation,
                        "end_location_parent_image" => "http://" . $request->getHttpHost() . "/" . $endLocationImage->image,
                        "start_location" => $trip->start_location,
                        "end_location" => $trip->end_location,
                        "trip_price" => $trip->trip_price,
                        "interval_trip" => $trip->interval_trip,
                        // seat
                        "total_seat" => $trip->total_seat,
                        "total_seat_used" => $trip->total_seat_used,
                        "total_seat_available" => $trip->total_seat_available,
                        "array_seat_code_used" => $trip->array_seat_code_used,
                        //car
                        "car_name" => $trip->car->name,
                        "car_type" => $trip->car->typeCar->name,
                        "car_color" => $trip->car->color,
                        "car_image" => $carImageName,
                        "car_license_plate" => $trip->car->license_plate,
                        "car_color" => $trip->car->color,
                        // trip time create, update
                        "created_at" => $trip->created_at,
                        "updated_at" => $trip->updated_at,
                    ];
                };

                // for more trip data
                $formatedMoreTripData = [];

                $filteredMoreTrips = $totalMoreTrips->map(function ($trip) use ($ticketCount) {
                    $trip['total_seat'] = optional(optional($trip->car)->typeCar)->total_seat;
                    $trip['total_seat_used'] = collect($trip->bill)->sum('total_seat_used') ?? 0;
                    // Pluck 'seat_code_used' from each bill and flatten the array
                    $seatCodes = collect($trip->bill)->pluck('seat_code_used')->flatten()->toArray();
                    // Decode JSON strings to arrays
                    $seatCodes = array_map('json_decode', $seatCodes);
                    // Flatten again to merge all seat codes into a single array
                    $trip['array_seat_code_used'] = collect($seatCodes)->flatten()->toArray();

                    // Check if totalSeat and totalSeatUsed are not null before comparing
                    if ($trip['total_seat'] !== null && $trip['total_seat_used'] !== null) {
                        // Calculate the available seats
                        $trip['total_seat_available'] = $trip['total_seat'] - $trip['total_seat_used'];

                        if ($trip['total_seat_available'] >= $ticketCount) {
                            return $trip;
                        }
                    }
                })->filter();

                foreach ($filteredMoreTrips as $trip) {
                    $startLocationImage = $parentLocationImage->first(function ($location) use ($startLocation) {
                        return $location->name === $startLocation;
                    });
                    $endLocationImage = $parentLocationImage->first(function ($location) use ($endLocation) {
                        return $location->name === $endLocation;
                    });

                    // format car image url
                    $carImageName = $trip->car->image ?? "";
                    if ($trip->car->image) {
                        if ($trip->car->image[0] !== "/") {
                            $carImageName = "/" . $trip->car->image ?? '';
                        }
                        $carImageName = "http://" . $request->getHttpHost() . $carImageName;
                    }

                    $formatedMoreTripData[] = [
                        // trip
                        "trip_id" => $trip->id,
                        "start_time" => $trip->start_time,
                        "route_name" => $trip->route->route_name,
                        "start_location_parent" => $startLocation,
                        "start_location_parent_image" => "http://" . $request->getHttpHost() . "/" . $startLocationImage->image,
                        "end_location_parent" => $endLocation,
                        "end_location_parent_image" => "http://" . $request->getHttpHost() . "/" . $endLocationImage->image,
                        "start_location" => $trip->start_location,
                        "end_location" => $trip->end_location,
                        "trip_price" => $trip->trip_price,
                        "interval_trip" => $trip->interval_trip,
                        // seat
                        "total_seat" => $trip->total_seat,
                        "total_seat_used" => $trip->total_seat_used,
                        "total_seat_available" => $trip->total_seat_available,
                        "array_seat_code_used" => $trip->array_seat_code_used,
                        //car
                        "car_name" => $trip->car->name,
                        "car_type" => $trip->car->typeCar->name,
                        "car_color" => $trip->car->color,
                        "car_image" => $carImageName,
                        "car_license_plate" => $trip->car->license_plate,
                        "car_color" => $trip->car->color,
                        // trip time create, update
                        "created_at" => $trip->created_at,
                        "updated_at" => $trip->updated_at,
                    ];
                };

                // Extract IDs from array A
                $idsFormatedData = array_column($formatedData, 'trip_id');

                // Filter array B
                $arrayFormatedMoreTripData = array_filter($formatedMoreTripData, function ($item) use ($idsFormatedData) {
                    return !in_array($item['trip_id'], $idsFormatedData);
                });

                // Limit the array length to 10
                $arrayFormatedMoreTripData = array_slice($arrayFormatedMoreTripData, 0, 10);

                // Convert array B back to indexed array
                $formatedMoreTripData = array_values($arrayFormatedMoreTripData);

                return response()->json([
                    'message' => 'ok',
                    'total_data_records' => count($formatedData),
                    'total_extra_data_records' => count($formatedMoreTripData),
                    'data' => $formatedData,
                    'extra_data' => $formatedMoreTripData
                ], 200);
            } else {
                return response()->json([
                    'error' => 'Không có tuyến nào phù hợp'
                ], 200);
            }
        } catch (ValidationException $e) {
            // Return validation error messages if validation fails
            return response()->json(['error' => $e->errors()], 422);
        } catch (QueryException $e) {
            // Return an error response if database operation fails
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getParentLocations()
    {
        // Retrieve distinct parent locations from the database
        $locations = ParentLocation::distinct()
            ->select('id', 'name')
            ->orderBy('name', 'asc')
            ->get();

        return $locations;
    }

    public function realTimeSeat()
    {
        $this->getSeatDataService->rtGetSeatData();
    }
}
