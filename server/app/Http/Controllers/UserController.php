<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('typeUser')->get();

        return response()->json($users);
    }

    public function show($userId)
    {
        $user = User::with('typeUser')->find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
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

        return response()->json($user, 201);
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

        return response()->json($user);
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
