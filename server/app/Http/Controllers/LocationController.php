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
                'parent_locations_id' => 'required|integer|exists:parent_locations,id',
            ]);
            $location = new Location();
            $location->name = $request->input('name');
            $location->description = $request->input('description');
            $location->parent_locations_id = $request->input('parent_locations_id');
            if ($request->has('image')) {
                $imageData = $request->input('image');
                $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
                $imageData = str_replace(' ', '+', $imageData);
                $imageName = time() . '.jpg';
        
                $directory = 'media';
                $directoryPath = public_path($directory);
                if (!File::exists($directoryPath)) {
                    File::makeDirectory($directoryPath, 0777, true);
                }
                // Save the image to the storage disk
                $imagePath = $directory . '/' . $imageName;
                file_put_contents(public_path($imagePath), base64_decode($imageData));
    
                // Set the image path in the 'image' column
                $location->image = './server/public/'.$imagePath;
            }
            $location->save();
    
            return response()->json(['message' => 'Thêm mới địa điểm thành công', 'Location' => $location ]);
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
            $location->description = $request->input('description');
            $location->parent_locations_id = $request->input('parent_locations_id');
            if ($request->has('image')) {
                $imageData = $request->input('image');
                $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
                $imageData = str_replace(' ', '+', $imageData);
                $imageName = time() . '.jpg';
        
                $directory = 'media';
                $directoryPath = public_path($directory);
                if (!File::exists($directoryPath)) {
                    File::makeDirectory($directoryPath, 0777, true);
                }
                // Save the image to the storage disk
                $imagePath = $directory . '/' . $imageName;
                file_put_contents(public_path($imagePath), base64_decode($imageData));
    
                // Set the image path in the 'image' column
                $location->image = './server/public/'.$imagePath;
            }
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
