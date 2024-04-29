<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\Role;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        try {
            $users = User::with('typeUser')->get();

            return response()->json(['message' => 'Lấy dữ liệu thành công', 'uesrs' => $users]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình lấy dữ liệu', 'error' => $e->getMessage()]);
        }
    }

    public function show($userId)
    {
        try {
            $user = User::with('typeUser')->find($userId);

            if (!$user) {
                return response()->json(['message' => 'Người dùng không tồn tại'], 404);
            }

            return response()->json(['message' => 'Lấy dữ liệu thành công', 'uesr' => $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình lấy dữ liệu', 'error' => $e->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|unique:users',
                'name' => 'required',
                'role_id' => 'required|numeric',
                'password' => 'required',
                'phone_number' => 'nullable',
                'address' => 'nullable',
                'user_type_id' => 'required|exists:type_users,id|numeric',
                'description' => 'nullable',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
                'location' => 'nullable',
            ], $this->getValidationMessages());

            $user = new User();
            $user->user_type_id = $request->input('user_type_id');
            $user->email = $request->input('email');
            $user->role_id = $request->input('role_id');
            $user->name = $request->input('name');
            $user->password = Hash::make($request->input('password'));
            $user->phone_number = $request->input('phone_number');
            $user->address = $request->input('address');
            $user->description = $request->input('description');

            $imageTruePath = "";
            if ($request->has('avatar')) {
                $saveImageTo = 'images/avatar';
                $image = $request->file('avatar');

                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->storeAs($saveImageTo, $imageName, 'public');
                $imageTruePath = substr(Storage::url($saveImageTo . '/' . $imageName), 1);
            }
            $user->avatar = $imageTruePath;
            $user->location = $request->input('location');
            $user->save();

            return response()->json(['message' => 'Thêm mới người dùng thành công', 'uesr' => $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình  thêm người dùng', 'error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $userId)
    {
        try {
            $request->validate([
                'name' => 'nullable',
                'email' => [
                    'required',
                    'email',
                    Rule::unique('users')->ignore($userId),
                ],
                'phone_number' => 'nullable',
                'address' => 'nullable',
                'password' => 'nullable',
                'description' => 'nullable',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
                'location' => 'nullable',
                'user_type_id' => 'nullable|exists:type_users,id|numeric',
                'role_id' => 'nullable|numeric',
            ], $this->getValidationMessages());

            $user = User::find($userId);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            if ($request->has('name')) {
                $user->name = $request->input('name');
            }
            if ($request->has('email') && $user->email !== $request->email) {
                $user->email = $request->input('email');
            }
            if ($request->has('phone_number')) {
                $user->phone_number = $request->input('phone_number');
            }
            if ($request->has('address')) {
                $user->address = $request->input('address');
            }
            if ($request->has('role_id')) {
                $user->role_id = $request->input('role_id');
            }
            if ($request->has('user_type_id')) {
                $user->user_type_id = $request->input('user_type_id');
            }
            if ($request->has('password')) {
                $user->password = Hash::make($request->input('password'));
            }
            if ($request->has('description')) {
                $user->description = $request->input('description');
            }
            if ($request->has('avatar')) {
                $saveImageTo = 'images/avatar';
                $image = $request->file('avatar');

                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->storeAs($saveImageTo, $imageName, 'public');
                $imageTruePath = substr(Storage::url($saveImageTo . '/' . $imageName), 1);
                $user->avatar = $imageTruePath;
            }
            if ($request->has('location')) {
                $user->location = $request->input('location');
            }
            $user->save();

            return response()->json(['message' => 'Cập nhật người dùng thành công', 'uesr' => $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình  cập nhật người dùng', 'error' => $e->getMessage()]);
        }
    }

    public function destroy($userId)
    {
        try {
            $user = User::find($userId);

            if (!$user) {
                return response()->json(['message' => 'Người dùng không tồn tại'], 404);
            }

            // Check if the user is trying to delete themselves
            if ($user->id === Auth::user()->id) {
                return response()->json(['message' => 'Bạn không thể xóa chính mình'], 403);
            }

            $user->delete();

            return response()->json(['message' => 'Xóa người dùng thành công']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Xóa người dùng thất bại', 'error' => $e->getMessage()]);
        }
    }

    private function getValidationMessages()
    {
        return [
            'user_type_id.required' => 'The user type is required.',
            'user_type_id.numeric' => 'id type user bắt buộc là số',
            'user_type_id.exists' => 'The selected user type is invalid.',
            'email.required' => 'The email is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'name.required' => 'The name is required.',
            'password.required' => 'The password is required.',
        ];
    }

    public function update2(Request $request)
    {
        try {
            // Validate only the fields that are being updated
            $request->validate([
                'id' => 'required|exists:users,id',
                'name' => 'nullable',
                'phone_number' => 'nullable',
                'address' => 'nullable',
                'description' => 'nullable',
                'location' => 'nullable',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048', // max size 5MB
            ]);

            $user = User::find($request->input('id'));

            // Check if the user exists
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // Update the user fields if they are provided in the request
            if ($request->has('name')) {
                $user->name = $request->input('name');
            }
            if ($request->has('phone_number')) {
                $user->phone_number = $request->input('phone_number');
            }
            if ($request->has('address')) {
                $user->address = $request->input('address');
            }
            if ($request->has('description')) {
                $user->description = $request->input('description');
            }
            if ($request->has('location')) {
                $user->location = $request->input('location');
            }
            if ($request->has('avatar')) {
                $saveImageTo = 'images/avatar';
                $image = $request->file('avatar');

                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->storeAs($saveImageTo, $imageName, 'public');
                $imageTruePath = substr(Storage::url($saveImageTo . '/' . $imageName), 1);
                $user->avatar = $imageTruePath;
            }

            // Save the user model
            $user->save();

            return response()->json(['message' => 'Cập nhật người dùng thành công', 'user' => $user]);
        } catch (ValidationException $e) {
            // Return validation error messages if validation fails
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Return general error message for other exceptions
            return response()->json(['message' => 'Có lỗi trong quá trình cập nhật người dùng', 'error' => $e->getMessage()], 422);
        }
    }
}
