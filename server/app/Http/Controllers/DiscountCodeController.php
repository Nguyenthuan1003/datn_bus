<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DiscountCode;

class DiscountCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $discounts = DiscountCode::
            select('id', 'name', 'quantity', 'quantity_used', 'start_time', 'value', 'code', 'end_time', 'type_discount_code_id', 'created_at', 'updated_at')
                ->get();

            return response()->json([
                'status' => true,
                'message' => 'Truy vấn dữ liệu thành công',
                'discounts' => $discounts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:discount_codes',
                'code' => 'required|string|max:255|unique:discount_codes',
                'quantity' => 'required|integer|max:99999999999',
                'start_time' => 'required|date|after:' . now()->addSecond(),
                'end_time' => 'required|date|after:start_time',
                'value' => 'required|string|max:255',
                'type_discount_code_id' => 'required|integer|max:255|exists:type_discount_codes,id'
            ]);

            $discount = new DiscountCode();
            $discount->name = $request->input('name');
            $discount->code = $request->input('code');
            $discount->quantity = $request->input('quantity');
            $discount->quantity_used = 0;
            $discount->start_time = $request->input('start_time');
            $discount->end_time = $request->input('end_time');
            $discount->value = $request->input('value');
            $discount->type_discount_code_id = $request->input('type_discount_code_id');
            $discount->save();

            return response()->json([
                'message' => 'Thêm mới thành công',
                'discount' => $discount
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
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $discount = DiscountCode::select('id', 'name', 'quantity', 'quantity_used', 'start_time', 'value', 'code', 'end_time', 'type_discount_code_id', 'created_at', 'updated_at')
                ->find($id);

            if (!$discount) {
                return response()->json([
                    'message' => 'Mã giảm giá không tồn tại'
                ]);
            }

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'discount' => $discount
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
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
//         cần xử lý xem có user sử dụng mã này chưa? nếu đã sử dụng thì không cho sửa nữa
//            thêm status cho cái này bật tắt
//            xóa cũng cần kiểm tra điều kiện tương tự
//            kiểm tra các trường có thể cập nhật hay không


            $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('discount_codes')->ignore($id)
                ],
                'code' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('discount_codes')->ignore($id)
                ],
                'quantity' => 'required|integer|max:99999999999',
                'start_time' => 'required|date|after_or_equal:old_start_time',
                'end_time' => 'required|date|after:start_time',
                'value' => 'required|string|max:255',
                'type_discount_code_id' => 'required|integer|max:255|exists:type_discount_codes,id'
            ]);
            $discount = DiscountCode::find($id);

            if (!$discount) {
                return response()->json([
                    'message' => 'Mã giảm giá không tồn tại'
                ]);
            }

//            chú ý thêm các trường hợp lý
            $discount->name = $request->input('name');
//            $discount->code = $request->input('code');
//            $discount->quantity = $request->input('quantity');
//            $discount->quantity_used = 0;
//            $discount->start_time = $request->input('start_time');
//            $discount->end_time = $request->input('end_time');
//            $discount->value = $request->input('value');
//            $discount->type_discount_code_id = $request->input('type_discount_code_id');
            $discount->save();

            return response()->json([
                'message' => 'Cập nhật thành công mã giảm giá',
                'discount' => $discount
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
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $discount = DiscountCode::find($id);

            if (!$discount) {
                return response()->json([
                    'message' => 'Mã giảm giá không tồn tại'
                ]);
            }

            $discount->delete();

            return response()->json([
                'message' => 'Xóa mã giảm giá thành công'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                'error' => $e->getMessage()
            ]);
        }
    }
}
