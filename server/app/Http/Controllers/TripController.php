<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\ParentLocation;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Car;
use App\Models\Route;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
//            $trips = Trip::with(['car', 'driver', 'assistant', 'route'])->get();
            $trips = Trip::with(['car', 'route'])->get();

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'trips' => $trips
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                'error' => $e->getMessage()
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
                'routes' => $routes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                'error' => $e->getMessage()
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
                    'message' => 'Tuyến đi không tồn tại'
                ]);
            }

//            $start_locations = ParentLocation::with('location')->find($route->start_location);
//            $end_locations = ParentLocation::with('location')->find($route->end_location);
            $start_locations = ParentLocation::with('location')->where('name', $route->start_location)->first();
            $end_locations = ParentLocation::with('location')->where('name', $route->end_location)->first();

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'start_locations' => $start_locations,
                'end_locations' => $end_locations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
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
                    'message' => 'Tuyến đường này không hoạt động.'
                ]);
            }

            $startLocation = Location::with('parentLocation')->where('name', $request->input('start_location'))->first();
            $endLocation = Location::with('parentLocation')->where('name', $request->input('end_location'))->first();

            if ($startLocation->parentLocation->name != $route->start_location) {
                return response()->json([
                    'message' => 'Thông tin về vị trí bắt đầu không trùng khớp với tuyến đường!'
                ]);
            }

            if ($endLocation->parentLocation->name != $route->end_location) {
                return response()->json([
                    'message' => 'Thông tin về vị trí kết thúc không trùng khớp với tuyến đường!'
                ]);
            }

//            validate tạm hạn chế trùng chuyến xe cùng 1 thời điểm
            $isValid = Trip::where('car_id', $request->input('car_id'))
                ->where('start_time', $request->input('start_time'))
                ->first();

            if ($isValid) {
                return response()->json([
                    'message' => 'Xe này đã có chuyến đi vào giờ này!'
                ]);
            }

//          Save data:
            if ($request->input('loop') && $request->input('loop') > 1 && $request->input('interval_trip') < 12 ) {
                $trips = [];
                for($i = 0; $i < $request->input('loop'); $i++) {
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
                    'trips' => $trips
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
                    'trip' => $trip
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $trip = Trip::with(['car', 'route'])->find($id);

            if (!$trip) {
                return response()->json([
                    'message' => 'Chuyến đi không tồn tại'
                ]);
            }

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'trip' => $trip
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $trip = Trip::find($id);

            if (!$trip) {
                return response()->json([
                    'message' => 'Chuyến đi không tồn tại'
                ]);
            }

//            chỉ được cập nhật thông tin trước giờ khởi hành
//            đã có bill thì không được cập nhật thông tin nữa: nếu đổi xe sẽ ảnh hưởng vé. đổi cái khác thì ảnh hưởng tới khách hàng
//            chưa có bill thì được đổi thông tin

            if (!(\Carbon\Carbon::parse($trip->start_time, 'Asia/Ho_Chi_Minh')->isAfter(\Carbon\Carbon::now('Asia/Ho_Chi_Minh')))) {
                return response()->json([
                    'message' => 'Chuyến đi đã hết hạn điều chỉnh. Không thể cập nhật thông tin.'
                ]);
            } else {


                $request->validate([
                    'car_id' => 'required|integer|max:255|exists:cars,id',
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
                        'message' => 'Tuyến đường này không hoạt động.'
                    ]);
                }

                $startLocation = Location::with('parentLocation')->where('name', $request->input('start_location'))->first();
                $endLocation = Location::with('parentLocation')->where('name', $request->input('end_location'))->first();

                if ($startLocation->parentLocation->name != $route->start_location) {
                    return response()->json([
                        'message' => 'Thông tin về vị trí bắt đầu không trùng khớp với tuyến đường!'
                    ]);
                }

                if ($endLocation->parentLocation->name != $route->end_location) {
                    return response()->json([
                        'message' => 'Thông tin về vị trí kết thúc không trùng khớp với tuyến đường!'
                    ]);
                }

//            validate tạm hạn chế trùng chuyến xe cùng 1 thời điểm
                $isValid = Trip::where('car_id', $request->input('car_id'))
                    ->where('start_time', $request->input('start_time'))
                    ->whereNotIn('id', [$id])
                    ->first();

                if ($isValid) {
                    return response()->json([
                        'message' => 'Xe này đã có chuyến đi vào giờ này!'
                    ]);
                }

                if ($trip->bill()->exists() || $trip->comments()->exists()) { //nếu comment chỉ giành cho khi đi xong mới được đánh giá thì có thể xóa điều kiện comment
                    $trip->status = $request->input('status');
                    $trip->save();

                    return response()->json([
                        'message' => 'Cập nhật thông tin thành công.',
                        'warning' => 'Chỉ có thể cập nhật thông tin trạng thái chuyến đi đối với chuyến đi đã được đặt vé/đánh giá.',
                        'trip' => $trip
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
                        'trip' => $trip
                    ]);
                }
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $trip = Trip::find($id);

            if (!$trip) {
                return response()->json([
                    'message' => 'Chuyến đi không tồn tại'
                ]);
            }

            if ($trip->bill()->exists()) {
                return response()->json([
                    'message' => 'Chuyến đi đã được đặt vé, không được xóa. Nếu có thể hãy hủy/xóa vé để có thể xóa chuyến xe này.'
                ]);
            }

            if ($trip->comments()->exists()) {
                return response()->json([
                    'message' => 'Chuyến đi đã được đánh giá/bình luận, không được xóa. Nếu có thể hãy hủy/xóa bình luận để có thể xóa chuyến xe này.'
                ]);
            }

            $trip->delete();

            return response()->json([
                'message' => 'Xóa chuyến đi thành công'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }
}
