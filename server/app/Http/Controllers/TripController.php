<?php

namespace App\Http\Controllers;

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
            $trips = Trip::with(['car', 'route'])
                ->get();

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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'car_id' => 'required|integer|max:255|exists:cars,id',
                'start_date' => 'required|date|after_or_equal:today',
                'start_time' => 'required|date_format:Y-m-d H:i:s',
                'start_location' => 'required|string|max:255',
                'status' => 'required|numeric',
                'trip_price' => 'required|numeric|max:99999999',
                'end_location' => 'required|string|max:255',
                'end_time' => 'required|date_format:Y-m-d H:i:s',
                'route_id' => 'required|integer|max:255|exists:routes,id',
                'loop' => 'nullable|numeric|min:1'
            ]);

            $route = Route::find($request->input('route_id'));

            if (
                $request->input('start_location') != $route->start_location ||
                $request->input('end_location') != $route->end_location
            ) {
                return response()->json([
                    'message' => 'Thông tin về tuyến đường không trùng khớp!'
                ]);
            }

            if ($request->input('loop') && $request->input('loop') > 1) {
                $trips = [];
                for($i = 0; $i < $request->input('loop'); $i++) {
                    $trip = new Trip();
                    $trip->car_id = $request->input('car_id');
                    $trip->start_time = $request->input('start_time');
                    $trip->start_location = $request->input('start_location');
                    $trip->status = $request->input('status');
                    $trip->trip_price = $request->input('trip_price');
                    $trip->end_location = $request->input('end_location');
                    $trip->end_time = $request->input('end_time');
                    $trip->route_id = $request->input('route_id');
                    $trip->start_date = \Carbon\Carbon::parse($request->input('start_date'))
                        ->addDays($i)
                        ->toDateString();
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
                $trip->start_time = $request->input('start_time');
                $trip->start_location = $request->input('start_location');
                $trip->status = $request->input('status');
                $trip->trip_price = $request->input('trip_price');
                $trip->end_location = $request->input('end_location');
                $trip->end_time = $request->input('end_time');
                $trip->route_id = $request->input('route_id');
                $trip->start_date = $request->input('start_date');
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
            $trip = Trip::with(['car', 'route'])
                ->find($id);

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

//            sau giờ khời hành thì không được cập nhật thông tin
//            đã lên bill thì chỉ được đổi tài xế/lái xe
//            chưa có bill thì được đổi thông tin
//            thiết kế db có nhiều vấn đề nên xảy ra nhiều point khó xử lý

            if (!(\Carbon\Carbon::parse($trip->start_date)->isAfter(\Carbon\Carbon::now('Asia/Ho_Chi_Minh')))) {
                return response()->json([
                    'message' => 'Chuyến đi đã hết hạn điều chỉnh. Không thể cập nhật thông tin.'
                ]);
            } else {
                $request->validate([
                    'car_id' => 'required|integer|max:255|exists:cars,id',
                    'start_date' => 'required|date|after_or_equal:today',
                    'start_time' => 'required|date_format:Y-m-d H:i:s',
                    'start_location' => 'required|string|max:255',
                    'status' => 'required|numeric',
                    'trip_price' => 'required|numeric|max:99999999',
                    'end_location' => 'required|string|max:255',
                    'end_time' => 'required|string|date_format:Y-m-d H:i:s',
                    'route_id' => 'required|integer|max:255|exists:routes,id'
                ]);

                $route = Route::find($request->input('route_id'));

                if (
                    $request->input('start_location') != $route->start_location ||
                    $request->input('end_location') != $route->end_location
                ) {
                    return response()->json([
                        'message' => 'Thông tin về tuyến đường không trùng khớp!'
                    ]);
                }

                if (
                    $request->input('status') == 0
                ) {
                    return response()->json([
                        'message' => 'Tuyến đường này không hoạt động.'
                    ]);
                }

                if ($trip->bill()->exists() || $trip->comment()->exists()) {
                    $trip->save();

                    return response()->json([
                        'message' => 'Cập nhật thông tin thành công.',
                        'warning' => 'Chỉ có thể cập nhật thông tin tài xế và lái xe đối với chuyến đi đã được đặt vé/đánh giá.',
                        'trip' => $trip
                    ]);
                } else {
                    $trip->car_id = $request->input('car_id');
                    $trip->start_time = $request->input('start_time');
                    $trip->start_location = $request->input('start_location');
                    $trip->status = $request->input('status');
                    $trip->trip_price = $request->input('trip_price');
                    $trip->end_location = $request->input('end_location');
                    $trip->end_time = $request->input('end_time');
                    $trip->route_id = $request->input('route_id');
                    $trip->start_date = $request->input('start_date');
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

            if ($trip->comment()->exists()) {
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
    
    public function searchTrip(Request $request)
    {
        $startLocation = $request->input('start_location');
        $endLocation = $request->input('end_location');
        $startDate = $request->input('start_date');
        $startTime = $request->input('start_time');
        $ticketCount = $request->input('ticket_count');

        $matchingTrips = Trip::where('start_location', 'like', $startLocation . '%')
            ->where('end_location', 'like', $endLocation . '%')
            ->where('start_date', 'like', $startDate . '%')
            ->where('start_time', 'like', $startTime . '%')
            ->get();

        if (
            $matchingTrips->count() < $ticketCount ||
            !$matchingTrips->count()
        ) {
            return response()->json([
                'error' => 'Lỗi tìm kiếm'
            ], 404);
        }

        return response()->json([
            'message' => $matchingTrips,
        ], 200);
    }
}
