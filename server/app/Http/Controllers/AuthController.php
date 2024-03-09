<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        try {
            // Validate the incoming request data
            request()->validate([
                'email' => 'required|email',
                'password' => 'required|min:8',
            ]);
            $credentials = request(['email', 'password']);

            if (!$token = auth()->attempt($credentials)) {
                return response()->json(['error' => 'Sai thông tin đăng nhập!'], 401);
            }

            $userData = User::where('email', '=', request()->email)
                ->with('typeUser')
                ->firstOrFail();

            $userDataFormated = [
                "name" => $userData->name,
                "email" => $userData->email,
                "phone_number" => $userData->phone_number,
                "type_user" => $userData->typeUser->name,
                "avatar" =>  request()->getHttpHost() . '/' . $userData->avatar,
                "address" => $userData->address,
                "description" => $userData->description,
                "location" => $userData->location,
                "created_at" => $userData->created_at
            ];

            return response()->json([
                'message' => 'ok',
                'data' => [
                    'jwt' => $this->respondWithToken($token),
                    'user' => $userDataFormated
                ],
            ], 200);
        } catch (ValidationException $e) {
            // Return validation error messages if validation fails
            return response()->json(['error' => $e->errors()], 422);
        }
    }

    /**
     * Register a account.
     *
     * @return mix
     */
    public function register()
    {
        // Validate the request data
        try {
            // Validate the incoming request data
            request()->validate([
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:8',
                'phone_number' => 'required|regex:/^[0-9]{10}$/|unique:users,phone_number'
            ]);

            // Create a new user, and generate a token
            $user = User::create([
                'email' => request('email'),
                'password' => bcrypt(request('password')),
                'phone_number' => request('phone_number'),
                'name' => 'user' . Carbon::now()->format('YmdHis'),
                'user_type_id' => 2,
                'role_id' => 2,
                'avatar' => 'images/avatar/default_avt.jpg'
            ]);

            $token = auth()->login($user);

            return response()->json([
                'message' => 'ok',
                'data' => [
                    $this->respondWithToken($token)
                ],
            ], 200);
        } catch (ValidationException $e) {
            // Return validation error messages if validation fails
            return response()->json(['error' => $e->errors()], 422);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $userData = auth()->user();

        $userDataFormated = [
            "name" => $userData->name,
            "email" => $userData->email,
            "phone_number" => $userData->phone_number,
            "type_user" => $userData->typeUser->name,
            "avatar" =>  request()->getHttpHost() . '/' . $userData->avatar,
            "address" => $userData->address,
            "description" => $userData->description,
            "location" => $userData->location,
            "created_at" => $userData->created_at
        ];

        return response()->json([
            'message' => 'ok',
            'data' => [
                'user' => $userDataFormated
            ],
        ], 200);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Đăng xuất thành công']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
