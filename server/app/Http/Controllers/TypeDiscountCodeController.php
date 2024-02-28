<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TypeDiscountCode;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

class TypeDiscountCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $typeDiscounts = TypeDiscountCode::all();

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'type_discounts' => $typeDiscounts
            ]);
        } catch (\Exception $e) {
//            Log::error('error: ' . $e->getMessage());
//            Log::error('Error occurred: ' . $e->getMessage(), [
//                'file' => $e->getFile(),
//                'line' => $e->getLine(),
//                'trace' => $e->getTraceAsString(),
//            ]);
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi truy vấn dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:type_discount_codes'
            ]);

            $typeDiscount = new TypeDiscountCode();
            $typeDiscount->name = $request->input('name');
            $typeDiscount->save();

            return response()->json([
                'message' => 'Thêm mới thành công',
                'type_discount' => $typeDiscount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $typeDiscount = TypeDiscountCode::find($id);

            if (!$typeDiscount) {
                return response()->json([
                    'message' => 'Loại mã giảm giá không tồn tại'
                ]);
            }

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'type_discount' => $typeDiscount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('type_discount_codes')->ignore($id)
                ]
            ]);

            $typeDiscount = TypeDiscountCode::find($id);

            if (!$typeDiscount) {
                return response()->json([
                    'message' => 'Loại mã giảm giá không tồn tại'
                ]);
            }

            $typeDiscount->name = $request->input('name');
            $typeDiscount->save();

            return response()->json([
                'message' => 'Cập nhật thành công loại mã giảm giá',
                'type_discount' => $typeDiscount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $typeDiscount = TypeDiscountCode::find($id);

            if (!$typeDiscount) {
                return response()->json([
                    'message' => 'Loại mã giảm giá không tồn tại'
                ]);
            }

            $typeDiscount->delete();

            return response()->json([
                'message' => 'Xóa loại mã giảm giá thành công'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }
}
