<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;

class RoleController extends Controller
{
    public function index()
    {
        // Fetch all roles
        $roles = Role::all();

        if ($roles->isEmpty()) {
            // If no roles found, return error response
            return response()->json([
                'error' => 'Không tìm thấy vai trò nào cả'
            ], 404);
        }

        // Return the roles as a response
        return response()->json([
            'message' => 'ok',
            'data' => $roles
        ], 200);
    }

    public function show($id)
    {
        // Find the role by its id
        $role = Role::find($id);

        if (!$role) {
            // If role not found, return error response
            return response()->json(['error' => 'Không tìm thấy vai trò nào cả'], 404);
        }

        // Return the role details as a response
        return response()->json([
            'message' => 'ok',
            'data' => $role
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            // Validate the incoming request data
            $request->validate([
                'name' => 'required|string|unique:roles|max:255'
            ]);

            // Create a new role instance
            $role = new Role();
            $role->name = $request->input('name');
            $role->description = $request->input('description') ?? "";

            // Save the role to the database
            $role->save();

            // Return a success response
            return response()->json([
                'message' => 'ok',
                'data' => $role
            ], 201);
        } catch (ValidationException $e) {
            // Return validation error messages if validation fails
            return response()->json(['error' => $e->errors()], 422);
        } catch (QueryException $e) {
            // Return an error response if database operation fails
            return response()->json(['error' => 'Tạo mới vai trò thất bại'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Find the role by its id
            $role = Role::find($id);

            if (!$role) {
                // If role not found, return error response
                return response()->json(['error' => 'Không tìm thấy vai trò nào cả'], 404);
            }

            // Validate the incoming request data
            $request->validate([
                'name' => 'required|string|max:255'
            ]);

            // Check role updateable
            if (!$this->canChangeRole($role->name, $request->name)) {
                return response()->json(['error' => 'Vai trò này không được phép thay đổi như vậy'], 403);
            }

            // Check if there are changes to role attributes
            $hasChanges = false;

            if ($role->name !== $request->name) {
                $role->name = $request->name;
                $hasChanges = true;
            }

            if (
                $request->description &&
                $role->description !== $request->description
            ) {
                $role->description = $request->description ?? '';
                $hasChanges = true;
            }

            // If no changes, return success response
            if (!$hasChanges) {
                return response()->json(['message' => 'Không có thay đổi nào được thực hiện'], 200);
            }

            // Save the updated role to the database
            $role->save();

            // Return a success response
            return response()->json(['message' => 'ok', 'data' => $role], 200);
        } catch (ValidationException $e) {
            // Return validation error messages if validation fails
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Return an error response if other exception occurs
            return response()->json(['error' => 'Cập nhật vai trò thất bại'], 500);
        }
    }

    public function destroy($id)
    {
        // Find the role by its id
        $role = Role::find($id);

        if (!$role) {
            // If role not found, return error response
            return response()->json(['error' => 'Không tìm thấy vai trò nào cả'], 404);
        }

        // Check role updateable
        if (!$this->canChangeRole($role->name)) {
            return response()->json(['error' => 'Vai trò này không được phép thay đổi như vậy'], 403);
        }

        // Delete the role from the database
        $role->delete();

        // Return a success response
        return response()->json(['message' => 'Xóa vai trò thành công', 'data' => $role], 200);
    }

    // check role can update or not
    function canChangeRole($currentRoleName, $validatedName = null)
    {
        // Array store roles that cannot be changed
        $roleCantChange = ['admin'];

        // if current role is role cant change and data update is not same with current role, return false
        // or if data update is role cant change, return false
        if (
            in_array($currentRoleName, $roleCantChange) && $validatedName !== $currentRoleName
            || in_array($validatedName, $roleCantChange)
        ) {
            return false;
        }

        return true;
    }
}
