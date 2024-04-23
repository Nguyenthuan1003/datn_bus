<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

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
            $request->validate([
                'name' => 'required|string|max:255|',
                'image' => 'nullable',
                'description' => 'nullable|string',
                'parent_location_id' => 'required|integer|exists:parent_locations,id',
            ]);
            $location = new Location();
            $location->name = $request->input('name');

            $imageTruePath = "";
            if ($request->has('image')) {
                $saveImageTo = 'images/location';
                $image = $request->file('image');

                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->storeAs($saveImageTo, $imageName, 'public');
                $imageTruePath = substr(Storage::url($saveImageTo . '/' . $imageName), 1);
            }
            $location->image = $imageTruePath;

            $location->description = $request->input('description');
            $location->parent_location_id = $request->input('parent_location_id');
            $location->save();

            return response()->json(['message' => 'Thêm mới địa điểm thành công', 'Location' => $location]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình thêm mới địa điểm', 'error' => $e->getMessage()]);
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
            return response()->json(['message' => 'Có lỗi trong quá trình lấy dữ liệu', 'error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'image' => 'nullable',
                'description' => 'nullable|string',
                'parent_location_id' => 'required|integer|exists:parent_locations,id',
            ]);

            $location = Location::find($id);

            if (!$location) {
                return response()->json(['message' => 'Location not found'], 404);
            }

            $location->name = $request->input('name');

            $imageTruePath = "";
            if ($request->has('image')) {
                $saveImageTo = 'images/location';
                $image = $request->file('image');

                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->storeAs($saveImageTo, $imageName, 'public');
                $imageTruePath = substr(Storage::url($saveImageTo . '/' . $imageName), 1);
                $location->image = $imageTruePath;
            }

            $location->description = $request->input('description');
            $location->parent_location_id = $request->input('parent_location_id');
            $location->save();

            return response()->json(['message' => 'Cập nhật địa điểm thành công', 'Location' => $location]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình cập nhật địa điểm', 'error' => $e->getMessage()]);
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
