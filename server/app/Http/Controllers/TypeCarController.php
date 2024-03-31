<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TypeCar;

class TypeCarController extends Controller
{
    public function index()
    {

        try {
            $typeCars = TypeCar::
            select('id', 'name', 'description', 'total_seat' , 'type_seats' , 'created_at', 'updated_at')
            ->get();
            return response()->json(['message' => 'Lấy dữ liệu thành công','type_car' => $typeCars], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu', 'error' => $e->getMessage()], 501);
        }
        
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'total_seat' => 'required|integer',
                'type_seats' => 'required|string|max:255'
            ]);
            $typeCar = new TypeCar();
            $typeCar->name = $request->input('name');
            $typeCar->description = $request->input('description');
            $typeCar->total_seat = $request->input('total_seat');
            $typeCar->type_seats = $request->input('type_seats');
            $typeCar->save();
            return response()->json(['message' => 'Thêm mới loại xe thành công','type_car' => $typeCar], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình thêm mới loại xe','error' => $e->getMessage()], 501);
        }
    }

    public function show($id)
    {
        try {
            $typeCar = TypeCar::select('id', 'name', 'total_seat', 'type_seats' )->find($id);

            if(!$typeCar) {
                return response()->json(['message' => 'Không tồn tại loại xe được yêu cầu', 'status' => false]);
            }

            return response()->json(['message' => 'Truy vấn dữ liệu loại xe thành công','type_car' => $typeCar], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình truy vấn dữ liệu','error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'total_seat' => 'required|integer',
                'type_seats' => 'required|string|max:255'
            ]);
            $typeCar = TypeCar::find($id);
            $typeCar->name = $request->input('name');
            $typeCar->description = $request->input('description');
            $typeCar->total_seat = $request->input('total_seat');
            $typeCar->type_seats = $request->input('type_seats');
            $typeCar->save();
            
            return response()->json(['message' => 'Cập nhật loại xe thành công','type_car' => $typeCar], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật địa điểm','error' => $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $typeCar = TypeCar::find($id);

        if (!$typeCar) {
            return response()->json(['message' => 'Không tồn tại loại xe cần xóa', 'status' => false], 404);
        }

        $typeCar->delete();

        return response()->json(['message' => 'Xóa loại xe thành công', 'status' => true]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa loại xe', 'error' => $e->getMessage()]);
        }
    }
}
