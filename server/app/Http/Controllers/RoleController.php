<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class RoleController extends Controller
{
    public function upload(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5048', // Max size 2MB
            ]);

            if ($request->hasFile('image')) {
                $saveImageTo = 'images';
                $image = $request->file('image');

                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->storeAs($saveImageTo, $imageName, 'public');

                $imageUrl = $request->getHttpHost() . Storage::url($saveImageTo . '/' . $imageName);

                return response()->json(
                    [
                        'message' => 'Lưu ảnh thành công',
                        'data' => [
                            'image_name' => $imageName,
                            'url' => $imageUrl
                        ]
                    ],
                    200
                );
            }
        } catch (ValidationException $e) {
            // Return validation error messages if validation fails
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Return an error response if other exception occurs
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
