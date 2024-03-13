<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        try {
            $users = User::with('typeUser')->get();

            return response()->json(['message' => 'Lấy dữ liệu thành công', 'uesrs' => $users]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình lấy dữ liệu','error' => $e->getMessage()]);
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
            return response()->json(['message' => 'Có lỗi trong quá trình lấy dữ liệu','error' => $e->getMessage()]);
        }
        
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_type_id' => 'required|exists:type_users,id|numeric',
                'email' => 'required|email|unique:users',
                'name' => 'required',
                'role_id' => 'required|numeric',
                'password' => 'required',
                'phone_number' => 'nullable',
                'address' => 'nullable',
                'description' => 'nullable',
                'avatar' => 'nullable',
                'location' => 'nullable',
            ], $this->getValidationMessages());
    
            $user = new User();
            $user->user_type_id = $request->input('user_type_id');
            $user->email = $request->input('email');
            $user->role_id = $request->input('role_id');
            $user->name = $request->input('name');
            $user->password = $request->input('password');
            $user->phone_number = $request->input('phone_number');
            $user->address = $request->input('address');
            $user->description = $request->input('description');
            $user->avatar = $request->input('avatar');
            $user->location = $request->input('location');
            $user->save();
    
            return response()->json(['message' => 'Thêm mới người dùng thành công', 'uesr' => $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình  thêm người dùng','error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $userId)
    {
        try {
            $request->validate([
                'user_type_id' => 'required|exists:type_users,id|numeric',
                'email' => [
                    'required',
                    'email',
                    Rule::unique('users')->ignore($userId),
                ],
                'name' => 'required',
                'role_id' => 'required|numeric',
                'password' => 'required',
                'phone_number' => 'nullable',
                'address' => 'nullable',
                'description' => 'nullable',
                'avatar' => 'nullable',
                'location' => 'nullable',
            ], $this->getValidationMessages());
    
            $user = User::find($userId);
    
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
    
            $user->user_type_id = $request->input('user_type_id');
            $user->email = $request->input('email');
            $user->role_id = $request->input('role_id');
            $user->name = $request->input('name');
            $user->password = $request->input('password');
            $user->phone_number = $request->input('phone_number');
            $user->address = $request->input('address');
            $user->description = $request->input('description');
            $user->avatar = $request->input('avatar');
            $user->location = $request->input('location');
            $user->save();
    
            return response()->json(['message' => 'Cập nhật người dùng thành công', 'uesr' => $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi trong quá trình  cập nhật người dùng','error' => $e->getMessage()]);
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
}
