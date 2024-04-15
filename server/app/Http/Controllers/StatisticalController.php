<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\ParentLocation;
use App\Models\TicketOrder;
use App\Models\TypeCar;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\Car;
use App\Models\Route;
use App\Models\User;
use App\Models\Bill;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StatisticalController extends Controller
{
    /**
     * Display statistical for home page in admin.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function home()
    {
        try {
            $months = range(1, 12);
            $currentDateTime = Carbon::now();
            $currentMonth = $currentDateTime->month;
            $currentYear = $currentDateTime->year;

            //            get total current month
            $tripCountCurrentMonth = Trip::whereMonth('start_time', $currentMonth)
                ->where('status', 1) // Chỉ lấy các chuyến xe có status = 1
                ->where('start_time', '<=', $currentDateTime) // Chỉ lấy các chuyến xe có start_time bé hơn hoặc bằng thời điểm hiện tại
                ->count();
            $userCountCurrentMonth = User::whereMonth('created_at', $currentMonth)->count();
            $totalRevenueCurrentMonth = Bill::whereMonth('created_at', $currentMonth)
                ->where('status_pay', 1) // Chỉ lấy các bản ghi có status_pay = 1
                ->sum('total_money_after_discount');

            //            get total current year
            $tripCountCurrentYear = Trip::whereYear('start_time', $currentYear)
                ->where('status', 1)
                ->where('start_time', '<=', $currentDateTime)
                ->count();
            $userCountCurrentYear = User::whereYear('created_at', $currentYear)->count();
            $totalRevenueCurrentYear = Bill::whereYear('created_at', $currentYear)
                ->where('status_pay', 1) // Chỉ lấy các bản ghi có status_pay = 1
                ->sum('total_money_after_discount');

            //            get totals by month by year
            $totalStatisticalByYear = [];

            $tripCountsByMonth = Trip::whereYear('start_time', $currentYear)
                ->where('status', 1)
                ->where('start_time', '<=', $currentDateTime)
                ->select(DB::raw('MONTH(start_time) AS month'), DB::raw('COUNT(*) AS trip_count'))
                ->groupBy('month')
                ->orderBy('month')
                ->get();
            $userCountsByMonth = User::whereYear('created_at', $currentYear)
                ->select(DB::raw('MONTH(created_at) AS month'), DB::raw('COUNT(*) AS user_count'))
                ->groupBy('month')
                ->orderBy('month')
                ->get();
            $totalRevenueByMonth = Bill::whereYear('created_at', $currentYear)
                ->select(DB::raw('MONTH(created_at) AS month'), DB::raw('SUM(total_money_after_discount) AS total_revenue'))
                ->where('status_pay', 1)
                ->groupBy('month')
                ->orderBy('month')
                ->get();

            //  Chuyển kết quả về dạng mảng
            $tripCountsByMonth = $tripCountsByMonth->pluck('trip_count', 'month')->toArray();
            $userCountsByMonth = $userCountsByMonth->pluck('user_count', 'month')->toArray();
            $totalRevenueByMonth = $totalRevenueByMonth->pluck('total_revenue', 'month')->toArray();
            //  Điền giá trị cho các tháng không có bản ghi
            $tripCountsByMonth = array_replace(array_fill_keys($months, 0), $tripCountsByMonth);
            $userCountsByMonth = array_replace(array_fill_keys($months, 0), $userCountsByMonth);
            $totalRevenueByMonth = array_replace(array_fill_keys($months, 0), $totalRevenueByMonth);

            for ($month = 1; $month <= 12; $month++) {
                $totalStatisticalByYear[$month] = [
                    'trip_count_by_month' => $tripCountsByMonth[$month],
                    'user_count_by_month' => $userCountsByMonth[$month],
                    'total_revenue_by_month' => $totalRevenueByMonth[$month]
                ];
            }

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'trip_count_current_month' => $tripCountCurrentMonth,
                'user_count_current_month' => $userCountCurrentMonth,
                'total_revenue_current_month' => $totalRevenueCurrentMonth,
                'trip_count_current_year' => $tripCountCurrentYear,
                'user_count_current_year' => $userCountCurrentYear,
                'total_revenue_current_year' => $totalRevenueCurrentYear,
                'total_statistical_current_year' => $totalStatisticalByYear,
                'status' => 'success',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                'status' => 'fail',
                //                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display statistical for general page in admin. (in statistical tab - general)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function general()
    {
        try {
            $currentDateTime = Carbon::now();
            $totalCarType = TypeCar::count();
            $totalCar = Car::where('status', 1)->count();
            $totalLocation = Location::count();
            $totalTrip = Trip::where('status', 1)
                ->where('start_time', '<=', $currentDateTime)
                ->count();
            $top10Car = Car::select('cars.id', 'cars.name', DB::raw('COUNT(trips.id) as total_trip'), DB::raw('SUM(bills.total_money_after_discount) as total_money'), DB::raw('SUM(bills.total_seat) as total_seat'))
                ->leftJoin('trips', 'cars.id', '=', 'trips.car_id')
                ->leftJoin('bills', function ($join) {
                    $join->on('trips.id', '=', 'bills.trip_id')
                        ->where('bills.status_pay', '=', 1);
                })
                ->groupBy('cars.id', 'cars.name')
                ->orderByDesc('total_money')
                ->limit(10)
                ->get();

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'total_car_type' => $totalCarType,
                'total_car' => $totalCar,
                'total_location' => $totalLocation,
                'total_trip' => $totalTrip,
                'top_10_Car' => $top10Car,
                'status' => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                'status' => 'fail',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display statistical for revenue and trip in year
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function revenueTripYear(Request $request)
    {
        try {
            $year = $request->input('year');
            $currentDateTime = Carbon::now();

            //            if (!$year) {
            //                return response()->json([
            //                    'message' => 'Không có thông tin trường year'
            //                ]);
            //            }

            $request->validate([
                'year' => 'required|integer'
            ]);

            $months = range(1, 12);
            $totalStatisticalByYear = [];

            $tripCountsByMonth = Trip::whereYear('start_time', $year)
                ->where('status', 1)
                ->where('start_time', '<=', $currentDateTime)
                ->select(DB::raw('MONTH(start_time) AS month'), DB::raw('COUNT(*) AS trip_count'))
                ->groupBy('month')
                ->orderBy('month')
                ->get();
            $totalRevenueByMonth = Bill::whereYear('created_at', $year)
                ->select(DB::raw('MONTH(created_at) AS month'), DB::raw('SUM(total_money_after_discount) AS total_revenue'))
                ->where('status_pay', 1)
                ->groupBy('month')
                ->orderBy('month')
                ->get();

            //  Chuyển kết quả về dạng mảng
            $tripCountsByMonth = $tripCountsByMonth->pluck('trip_count', 'month')->toArray();
            $totalRevenueByMonth = $totalRevenueByMonth->pluck('total_revenue', 'month')->toArray();
            //  Điền giá trị cho các tháng không có bản ghi
            $tripCountsByMonth = array_replace(array_fill_keys($months, 0), $tripCountsByMonth);
            $totalRevenueByMonth = array_replace(array_fill_keys($months, 0), $totalRevenueByMonth);
            for ($month = 1; $month <= 12; $month++) {
                $totalStatisticalByYear[$month] = [
                    'trip_count_by_month' => $tripCountsByMonth[$month],
                    'total_revenue_by_month' => $totalRevenueByMonth[$month]
                ];
            }

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'total_data' => $totalStatisticalByYear,
                'status' => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                'status' => 'fail',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display statistical for revenue and trip in start time and end time
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function revenueTripAbout(Request  $request)
    {
        try {
            $startDate = $request->input('start_date');
            $endDate = $request->input('end_date');
            $currentDateTime = Carbon::now();

            //            if (!$startDate || !$endDate) {
            //                return response()->json([
            //                    'message' => 'Không có đủ thông tin trường start_time hoặc end_time'
            //                ]);
            //            }

            $request->validate([
                'start_time' => 'required|date',
                'end_time' => 'required|date|after:start_time',
            ]);

            $totalStatisticalAbout = [];
            $currentDate = Carbon::parse($startDate);
            $endDate = Carbon::parse($endDate);

            while ($currentDate->lte($endDate)) {
                $totalStatisticalAbout[$currentDate->toDateString()] = [
                    'trip_count_by_date' => 0,
                    'total_revenue_by_date' => 0
                ];
                $currentDate->addDay();
            }

            $tripCountsByDays = Trip::whereBetween('created_at', [$startDate, $endDate])
                ->where('status', 1)
                ->where('start_time', '<=', $currentDateTime)
                ->selectRaw('DATE(start_time) as date, COUNT(*) AS trip_count')
                ->groupBy('date')
                ->orderBy('date')
                ->get();
            $totalRevenueByDays = Bill::whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('DATE(created_at) as date, SUM(total_money_after_discount) as total_revenue')
                ->where('status_pay', 1)
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            foreach ($tripCountsByDays as $tripCountByDay) {
                if ($tripCountByDay->trip_count) {
                    $totalStatisticalAbout[$tripCountByDay->date]['trip_count_by_date'] = $tripCountByDay->trip_count;
                }
            }

            foreach ($totalRevenueByDays as $totalRevenueByDay) {
                if ($totalRevenueByDay->total_revenue) {
                    $totalStatisticalAbout[$totalRevenueByDay->date]['total_revenue_by_date'] = $totalRevenueByDay->total_revenue;
                }
            }


            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'total_data' => $totalStatisticalAbout,
                'status' => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                'status' => 'fail',
                //                'error' => $e->getMessage()
            ]);
        }
    }


    /**
     * Display statistical for user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user()
    {
        try {
            return response()->json([
                'message' => 'Chức năng đang phát triển',
                'status' => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                'status' => 'fail',
                //                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display statistical for route
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function route()
    {
        try {
            $currentDateTime = Carbon::now();
            $countAllRoute = Route::where('status', 1)
                ->count();
            $countAllTrip = Trip::where('status', 1)
                ->where('start_time', '<=', $currentDateTime)
                ->count();
            $totalRevenue = Bill::where('status_pay', 1)
                ->sum('total_money_after_discount');
            $top10Routes = Route::select('routes.id', 'routes.name')
                ->leftJoin('trips as T', function ($join) {
                    $join->on('routes.id', '=', 'T.route_id')
                        ->where('T.status', '=', '1');
                })
                ->leftJoin('bills as B', function ($join) {
                    $join->on('B.trip_id', '=', 'T.id')
                        ->where('B.status_pay', '=', '1');
                })
                ->groupBy('routes.id', 'routes.name')
                ->selectRaw('SUM(B.total_money_after_discount) as total_revenue')
                ->selectRaw('SUM(B.total_seat) as total_tickets')
                ->selectRaw('COUNT(T.id) as total_trips')
                ->orderByDesc('total_revenue')
                ->limit(10)
                ->get();
            // cách 2:
            //            $top10Routes = Route::select('routes.id', 'routes.name')
            //                ->leftJoin('trips as TR', function($join) {
            //                    $join->on('routes.id', '=', 'TR.route_id')
            //                        ->where('TR.status', '=', '1');
            //                })
            //                ->leftJoin('bills as B', function($join) {
            //                    $join->on('B.trip_id', '=', 'TR.id')
            //                        ->where('B.status_pay', '=', '1');
            //                })
            //                ->leftJoin('ticket_orders as TC', 'TC.bill_id', '=', 'B.id')
            //                ->groupBy('routes.id', 'routes.name')
            //                ->selectRaw('SUM(B.total_money_after_discount) as total_revenue')
            //                ->selectRaw('COUNT(TC.id) as total_tickets')
            //                ->selectRaw('COUNT(TR.id) as total_trips')
            //                ->orderByDesc('total_revenue')
            //                ->limit(10)
            //                ->get();

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'count_all_route' => $countAllRoute,
                'count_all_trip' => $countAllTrip,
                'total_revenue' => $totalRevenue,
                'top_10_routes' => $top10Routes,
                'status' => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                'status' => 'fail',
                //                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display statistical for route of year
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function routeForYear(Request  $request)
    {
        try {
            $request->validate([
                'year' => 'required|integer'
            ]);

            $months = range(1, 12);
            $currentDateTime = Carbon::now();
            $year = $request->input('year');
            $countAllRouteForYear = Route::whereYear('created_at', $year)
                ->where('status', 1)
                ->count();
            $countAllTripForYear = Trip::whereYear('start_time', $year)
                ->where('status', 1)
                ->where('start_time', '<=', $currentDateTime)
                ->count();
            $totalRevenueForYear = Bill::whereYear('created_at', $year)
                ->where('status_pay', 1)
                ->sum('total_money_after_discount');
            $countAllTicketForYear = TicketOrder::whereYear('created_at', $year)
                ->count();

            $dataForChar = [];
            $tripCountsByMonth = Trip::whereYear('start_time', $year)
                ->where('status', 1)
                ->where('start_time', '<=', $currentDateTime)
                ->select(DB::raw('MONTH(start_time) AS month'), DB::raw('COUNT(*) AS trip_count'))
                ->groupBy('month')
                ->orderBy('month')
                ->get();
            $totalRevenueByMonth = Bill::whereYear('created_at', $year)
                ->select(DB::raw('MONTH(created_at) AS month'), DB::raw('SUM(total_money_after_discount) AS total_revenue'))
                ->where('status_pay', 1)
                ->groupBy('month')
                ->orderBy('month')
                ->get();
            $userCountsByMonth = User::whereYear('created_at', $year)
                ->select(DB::raw('MONTH(created_at) AS month'), DB::raw('COUNT(*) AS user_count'))
                ->groupBy('month')
                ->orderBy('month')
                ->get();
            //  Chuyển kết quả về dạng mảng
            $tripCountsByMonth = $tripCountsByMonth->pluck('trip_count', 'month')->toArray();
            $totalRevenueByMonth = $totalRevenueByMonth->pluck('total_revenue', 'month')->toArray();
            $userCountsByMonth = $userCountsByMonth->pluck('user_count', 'month')->toArray();
            //  Điền giá trị cho các tháng không có bản ghi
            $tripCountsByMonth = array_replace(array_fill_keys($months, 0), $tripCountsByMonth);
            $totalRevenueByMonth = array_replace(array_fill_keys($months, 0), $totalRevenueByMonth);
            $userCountsByMonth = array_replace(array_fill_keys($months, 0), $userCountsByMonth);
            for ($month = 1; $month <= 12; $month++) {
                $dataForChar[$month] = [
                    'trip_count_by_month' => $tripCountsByMonth[$month],
                    'total_revenue_by_month' => $totalRevenueByMonth[$month],
                    'user_count_by_month' => $userCountsByMonth[$month]
                ];
            }

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'count_all_route_for_year' => $countAllRouteForYear,
                'count_all_trip_for_year' => $countAllTripForYear,
                'total_revenue_for_year' => $totalRevenueForYear,
                'count_all_ticket_for_year' => $countAllTicketForYear,
                'data_for_char' => $dataForChar,
                'status' => 'success',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                'status' => 'fail',
                //                'error' => $e->getMessage()
            ]);
        }
    }
}
