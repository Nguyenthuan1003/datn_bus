<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ParentLocation;

class ParentLocationController extends Controller
{
    public function index()
    {

        try {
            $parentLocations = ParentLocation::
            select('id', 'name', 'created_at', 'updated_at')
            ->get();
            return response()->json(['message' => 'Lấy dữ liệu thành công','parent-location' => $parentLocations, 'status' => true], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu', 'error' => $e->getMessage(), 'status' => false], 501);
        }
        
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
            ]);
            $parentLocation = new ParentLocation();
            $parentLocation->name = $request->input('name');
            $parentLocation->save();
            return response()->json(['message' => 'Thêm mới địa điểm thành công','parent-location' => $parentLocation, 'status' => true], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình thêm mới địa điểm','error' => $e->getMessage(), 'status' => true], 501);
        }
    }

    public function show($id)
    {
        try {
            $parentLocation = ParentLocation::select('id', 'name')->find($id);

            if(!$parentLocation) {
                return response()->json(['message' => 'Không tồn tại địa điểm được yêu cầu', 'status' => false]);
            }

            return response()->json(['message' => 'Truy vấn dữ liệu địa điểm thành công','parent-location' => $parentLocation, 'status' => true], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình truy vấn dữ liệu','error' => $e->getMessage(), 'status' => false]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
            ]);
            $parentLocation = ParentLocation::find($id);
            $parentLocation->name = $request->input('name');
            $parentLocation->save();
            return response()->json(['message' => 'Cập nhật địa điểm thành công','parent-location' => $parentLocation,'status' => true ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật địa điểm','error' => $e->getMessage(),'status' => false ]);
        }
        
    }

    public function destroy($id)
    {
        try {
            $parentLocation = ParentLocation::find($id);

        if (!$parentLocation) {
            return response()->json(['message' => 'Không tồn tại địa điểm cần xóa', 'status' => false], 404);
        }

        $parentLocation->delete();

        return response()->json(['message' => 'Xóa địa điểm thành công', 'status' => true]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa địa điểm', 'error' => $e->getMessage(), 'status' => false]);
        }
        
    }
}
