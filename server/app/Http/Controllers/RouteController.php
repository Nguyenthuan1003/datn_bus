<?php
namespace App\Http\Controllers;

use App\Models\Route;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index()
    {
        try {
            $routes = Route::with('trip')->get();
            return response()->json(['message' => 'Truy vấn dữ liệu tuyến đường thành công','routes' => $routes]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Xảy ra lỗi khi truy vấn dữ liệu','error' => $e]);
        }
    }

    public function show($id)
    {
        try {
            $route = Route::with('trip')->find($id);

            if (!$route) {
                return response()->json(['message' => 'Tuyến đường yêu cầu không tồn tại'], 404);
            }

            return response()->json(['message' => 'Truy vấn dữ liệu tuyến đường thành công','route' => $route]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Xảy ra lỗi khi truy vấn dữ liệu','error' => $e]);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'start_location' => 'required|string',
                'end_location' => 'required|string',
                'status' => 'required',
                'description' => 'nullable|string',
            ]);

            $route = new Route();
            $route->name = $request->input('name');
            $route->start_location = $request->input('start_location');
            $route->end_location = $request->input('end_location');
            $route->status = $request->input('status');
            $route->description = $request->input('description');
            $route->save();
    
            $route->load('trip');
    
            return response()->json(['message' => 'Thêm mới tuyến đường thành công','route' => $route]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi khi thêm mới tuyến đường','error' => $e]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'start_location' => 'required|string',
                'end_location' => 'required|string',
                'status' => 'required',
                'description' => 'nullable|string',
            ]);
    
            $route = Route::with('trip')->find($id);
            $route->name = $request->input('name');
            $route->start_location = $request->input('start_location');
            $route->end_location = $request->input('end_location');
            $route->status = $request->input('status');
            $route->description = $request->input('description');
            $route->save();
    
            return response()->json(['message' => 'Cập nhật tuyến đường thành công','route' => $route]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi khi cập nhật tuyến đường','error' => $e]);
        }
    }

    public function destroy($id)
    {
        try {
            $route = Route::find($id);

            if (!$route) {
                return response()->json(['message' => 'Tuyến đường yêu cầu không tồn tại'], 404);
            }

            $route->delete();

            return response()->json(['message' => 'Xóa tuyến đường thành công']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi khi xóa tuyến đường','error' => $e]);
        }
    }
}
?>
