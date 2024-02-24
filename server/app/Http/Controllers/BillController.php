<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use Illuminate\Http\Request;

class BillController extends Controller
{
    public function index()
    {
        try {
            $bills = Bill::with('discountCode', 'seat', 'trip', 'user', 'ticketOrder')->get();

            return response()->json(['message' => 'Lấy dữ liệu thành công', 'bills' => $bills]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu', 'error' => $e->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'discount_code_id' => 'required',
                'seat_id' => 'required',
                'trip_id' => 'required',
                'user_id' => 'required',
                'status_pay' => 'required',
                'total_money' => 'required',
                'total_money_after_discount' => 'required',
                'type_pay' => 'required',
                'total_seat' => 'required',
                'code_bill' => 'required',
                'phone_number' => 'required',
            ]);
    
            $bill = new Bill();
            $bill->discount_code_id = $request->input('discount_code_id');
            $bill->seat_id = $request->input('seat_id');
            $bill->trip_id = $request->input('trip_id');
            $bill->user_id = $request->input('user_id');
            $bill->status_pay = $request->input('status_pay');
            $bill->total_money = $request->input('total_money');
            $bill->total_mony_after_discount = $request->input('total_mony_after_discount');
            $bill->type_pay = $request->input('type_pay');
            $bill->total_seat = $request->input('total_seat');
            $bill->code_bill = $request->input('code_bill');
            $bill->phone_number = $request->input('phone_number');
            $bill->save();
    
            return response()->json(['message' => 'Thêm mới đơn hàng thành công','$bill' => $bill]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi thêm mới hóa đơn', 'error' => $e->getMessage()]);
        }
    }

    public function show($id)
    {
        try {
            $bill = Bill::with('discountCode', 'seat', 'trip', 'user', 'ticketOrder')->find($id);

            if (!$bill) {
                return response()->json(['message' => 'Không có hóa đơn nào được tìm thấy'], 404);
            }
    
            return response()->json(['message' => 'Lấy dữ liệu hóa đơn thành công', 'bill' => $bill]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu', 'error' => $e->getMessage()]);
        }
       
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'discount_code_id' => 'required',
                'seat_id' => 'required',
                'trip_id' => 'required',
                'user_id' => 'required',
                'status_pay' => 'required',
                'total_money' => 'required',
                'total_money_after_discount' => 'required',
                'type_pay' => 'required',
                'total_seat' => 'required',
                'code_bill' => 'required',
                'phone_number' => 'required',
            ]);
    
            $bill = Bill::find($id);
    
            if (!$bill) {
                return response()->json(['message' => 'Bill not found'], 404);
            }
    
            $bill->discount_code_id = $request->input('discount_code_id');
            $bill->seat_id = $request->input('seat_id');
            $bill->trip_id = $request->input('trip_id');
            $bill->user_id = $request->input('user_id');
            $bill->status_pay = $request->input('status_pay');
            $bill->total_money = $request->input('total_money');
            $bill->total_mony_after_discount = $request->input('total_mony_after_discount');
            $bill->type_pay = $request->input('type_pay');
            $bill->total_seat = $request->input('total_seat');
            $bill->code_bill = $request->input('code_bill');
            $bill->phone_number = $request->input('phone_number');
            $bill->save();
    
            return response()->json(['message' => 'Cập nhật đơn hàng thành công','$bill' => $bill]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật hóa đơn', 'error' => $e->getMessage()]);
        }
        
    }

    public function destroy($id)
    {
        try {
            $bill = Bill::find($id);

        if (!$bill) {
            return response()->json(['message' => 'Không có hóa đơn nào được tìm thấy'], 404);
        }

        $bill->delete();

        return response()->json(['message' => 'Xóa hóa đơn thành công']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi thực hiện hành động', 'error' => $e->getMessage()]);
        }
        
    }

    public function checkin (Request $request) {
        if($request->code_bill) {
            $bill = Bill::with('ticketOrder')->where('code_bill', $request->code_bill)->get();
            if(!$bill) {
                return response()->json(['message' => 'Mã hóa đơn không tồn tại']);
            }
            foreach($bill as $billItem) {
                foreach($billItem->ticketOrder as $ticket) {
                    $ticket->status = 1;
                    $ticket->save();
                }
            }
            return response()->json(['message' => 'Checkin hóa đơn thành công']);
        }
        return response()->json(['message' => 'Mã hóa đơn không tồn tại']);
    }
}
