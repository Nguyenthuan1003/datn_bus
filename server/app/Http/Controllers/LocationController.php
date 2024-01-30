<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;
use Illuminate\Support\Facades\Validator;


class LocationController extends Controller
{
    public function index()
    {   

        try {
            $locations = Location::with('parentLocation')->get();
            return response()->json(['message' => 'Lấy địa điểm thành công', 'Locations' => $locations]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu', 'error' => $e->getMessage()]);
        }
    }

    public function store(Request $request)
    {   

        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required|string|max:255|unique:locations',
                    'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048|',
                    'description' => 'required|nullable|string',
                    'parent_location_id' => 'required|integer|exists:parent_locations,id',
                ],
                [
                    'name.required' => "Tên không được để trống.",
                    'name.unique' => "Tên đã tồn tại.",
                    'description.required' => 'Mô tả không được để trống.',
                    'parent_location_id.required' => 'Vị trí không được để trống.',
                ]
            );
            if ($validator->passes()) {
                if ($request->hasFile('image')) {
                    $fileName = time() . '.' . $request->image->extension();
                    $request->image->storeAs('public/media', $fileName);
                }
                $data = Location::create([
                    'name' => $request->name,
                    'description' => $request->description,
                    'image' => asset('storage/media/' . $fileName) ?? '',
                    'parent_location_id' => $request->parent_location_id
                    
                ]);
             return response()->json(['message' => 'Thêm mới địa điểm thành công', 'data' => $data ]);
            };
            return response()->json(['message' => array_combine($validator->errors()->keys(), $validator->errors()->all()),]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình thêm mới địa điểm','error' => $e->getMessage()]);
        }
        
    }

    public function show($id)
    {
        try {
            $location = Location::with('parentLocation')->find($id);

        if (!$location) {
            return response()->json(['message' => 'Địa điểm yêu cầu không tồn tại'], 404);
        }

        return response()->json(['message' => 'Lấy địa điểm thành công', 'Locations' => $location]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình lấy dữ liệu','error' => $e->getMessage()]);
        }
        
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'image' => 'nullable',
                'description' => 'nullable|string',
                'parent_locations_id' => 'required|integer|exists:parent_locations,id',
            ]);
    
            $location = Location::find($id);
    
            if (!$location) {
                return response()->json(['message' => 'Location not found'], 404);
            }
    
            $location->name = $request->input('name');
            $location->image = $request->input('image');
            $location->description = $request->input('description');
            $location->parent_locations_id = $request->input('parent_locations_id');
            $location->save();
    
            return response()->json(['message' => 'Cập nhật địa điểm thành công', 'Location' => $location ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình cập nhật địa điểm','error' => $e->getMessage()]);
        }
        
    }

    public function destroy($id)
    {
        try {
            $location = Location::find($id);

            if (!$location) {
                return response()->json(['message' => 'Không tồn tại địa điểm cần xóa'], 404);
            }

            $location->delete();

            return response()->json(['message' => 'Xóa địa điểm thành công']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa địa điểm', 'error' => $e->getMessage()]);
        }
        
    }
}
