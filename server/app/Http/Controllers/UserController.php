<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('role', 'userType')->get();

        $formattedUsersData = [];

        foreach ($users as $user) {
            $formattedUsersData[] = $this->formatUserData($user);
        }

        return response()->json($formattedUsersData);
    }

    public function show($userId)
    {
        $user = User::with('role', 'userType')->find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $formattedUserData = $this->formatUserData($user);

        return response()->json($formattedUserData);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_type_id' => 'required|exists:user_types,id',
            'email' => 'required|email|unique:users',
            'name' => 'required',
            'password' => 'required',
            'phone_number' => 'nullable',
            'address' => 'nullable',
            'description' => 'nullable',
            'location' => 'nullable',
        ], $this->getValidationMessages());

        $user = User::create($validatedData);

        $formattedUserData = $this->formatUserData($user);

        return response()->json($formattedUserData, 201);
    }

    public function update(Request $request, $userId)
    {
        $validatedData = $request->validate([
            'user_type_id' => 'required|exists:user_types,id',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($userId),
            ],
            'name' => 'required',
            'password' => 'required',
            'phone_number' => 'nullable',
            'address' => 'nullable',
            'description' => 'nullable',
            'location' => 'nullable',
        ], $this->getValidationMessages());

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->update($validatedData);

        $formattedUserData = $this->formatUserData($user);

        return response()->json($formattedUserData);
    }

    public function destroy($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted']);
    }

    private function formatUserData($user)
    {
        return [
            'id' => $user->id,
            'user_type_id' => $user->user_type_id,
            'email' => $user->email,
            'name' => $user->name,
            'phone_number' => $user->phone_number,
            'address' => $user->address,
            'description' => $user->description,
            'location' => $user->location,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
            'role' => $user->role,
            'user_type' => $user->userType,
        ];
    }

    private function getValidationMessages()
    {
        return [
            'user_type_id.required' => 'The user type is required.',
            'user_type_id.exists' => 'The selected user type is invalid.',
            'email.required' => 'The email is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'name.required' => 'The name is required.',
            'password.required' => 'The password is required.',
        ];
    }
}
