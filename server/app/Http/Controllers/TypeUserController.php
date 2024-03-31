<?php

namespace App\Http\Controllers;

use App\Models\TypeUser;
use Illuminate\Http\Request;

class TypeUserController extends Controller
{
    public function index()
    {
        $typeUsers = TypeUser::all();
        return response()->json([
            'message' => 'Lấy dữ liệu thành công',
            'typeUsers' => $typeUsers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $typeUser = new TypeUser;
        $typeUser->name = $request->input('name');
        $typeUser->save();

        return response()->json([
            'message' => 'Thêm mới kiểu khách hàng thành công',
            'typeUser' => $typeUser
        ], 201);
    }

    public function show($id)
    {
        $typeUser = TypeUser::find($id);

        if (!$typeUser) {
            return response()->json(['message' => 'Kiểu dữ liệu không tồn tại'], 404);
        }

        return response()->json([
            'message' => 'Lấy dữ liệu thành công',
            'typeUser' => $typeUser
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $typeUser = TypeUser::find($id);

        if (!$typeUser) {
            return response()->json(['message' => 'Kiểu dữ liệu không tồn tại'], 404);
        }

        $typeUser->name = $request->input('name');
        $typeUser->save();

        return response()->json([
            'message' => 'Cập nhật dữ liệu thành công',
            'typeUser' => $typeUser
        ]);
    }

    public function destroy($id)
    {
        $typeUser = TypeUser::find($id);

        if (!$typeUser) {
            return response()->json(['message' => 'Kiểu khách hàng không tồn tại'], 404);
        }

        $typeUser->delete();

        return response()->json(['message' => 'Xóa dữ liệu thành công']);
    }
}
