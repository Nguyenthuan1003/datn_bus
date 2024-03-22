<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\TicketOrder;
use App\Mail\SendEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

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
                'seat_id' => 'required',
                'trip_id' => 'required',
                'status_pay' => 'required',
                'total_money' => 'required',
                'type_pay' => 'required',
                'total_seat' => 'required',
                'phone_number' => 'required',
                'full_name' => 'required',
                'code_seat' => 'required',
                'start_location' => 'required',
                'end_location' => 'required',
            ]);
    
            $bill = new Bill();
            $bill->discount_code_id = $request->input('discount_code_id');
            $bill->seat_id = $request->input('seat_id');
            $bill->trip_id = $request->input('trip_id');
            $bill->user_id = $request->input('user_id') ? $request->input('user_id') : 0;
            $bill->status_pay = $request->input('status_pay');
            $bill->total_money = $request->input('total_money');
            $bill->total_money_after_discount = $request->input('total_money_after_discount');
            $bill->type_pay = $request->input('type_pay');
            $bill->total_seat = $request->input('total_seat');
            $bill->code_bill = Str::random(8);
            $bill->full_name = $request->input('full_name');
            $bill->phone_number = $request->input('phone_number');
            $bill->email = $request->input('email');
            $bill->full_name = $request->full_name;
            
            $bill->save();
            $string = str_replace(['[', ']', "'"], '', $request->code_seat);
            $codeSeats = explode(', ', $string);
            foreach ($codeSeats as $codeSeat) {
                $ticketOrder = new TicketOrder;
                $ticketOrder->code_ticket = Str::random(8);
                $ticketOrder->bill_id = $bill->id;
                $ticketOrder->code_seat = $codeSeat;
                $ticketOrder->pickup_location = $request->input('start_location');
                $ticketOrder->pay_location = $request->input('end_location');
                $ticketOrder->status = 0;
                $ticketOrder->save();
            }
            $getBill = Bill::find($bill->id);
    
            return response()->json(['message' => 'Thêm mới đơn hàng thành công','bill' => $getBill]);
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
                'full_name' => 'required',
                'status_pay' => 'required',
                'type_pay' => 'required',
                'start_location' => 'required',
                'end_location' => 'required',
                'code_seat' => 'required',
            ]);
    
            $bill = Bill::find($id);
    
            if (!$bill) {
                return response()->json(['message' => 'Bill not found'], 404);
            }
    
            $bill->discount_code_id = $request->input('discount_code_id') ? $request->input('discount_code_id') : $bill->discount_code_id;
            $bill->seat_id = $request->input('seat_id') ? $request->input('seat_id') : $bill->seat_id;
            $bill->trip_id = $request->input('trip_id') ? $request->input('trip_id') : $bill->trip_id;
            $bill->user_id = $request->input('user_id') ? $request->input('user_id') : $bill->user_id;
            $bill->status_pay = $request->input('status_pay') ? $request->input('status_pay') : $bill->status_pay;
            $bill->total_money = $request->input('total_money') ? $request->input('total_money') : $bill->total_money;
            $bill->total_money_after_discount = $request->input('total_money_after_discount') ? $request->input('total_money_after_discount') : $bill->total_money_after_discount;
            $bill->type_pay = $request->input('type_pay') ? $request->input('type_pay') : $bill->type_pay;
            $bill->total_seat = $request->input('total_seat') ? $request->input('total_seat') : $bill->total_seat;
            $bill->full_name = $request->input('full_name') ? $request->input('full_name') : $bill->full_name;
            $bill->email = $request->input('email') ? $request->input('email') : $bill->email;
            $bill->phone_number = $request->input('phone_number') ? $request->input('phone_number') : $bill->phone_number;

            $bill->save();
            $getBill = Bill::with('discountCode', 'seat', 'trip', 'user', 'ticketOrder')->find($bill->id);
            Mail::to($getBill->email)->send(new SendEmail(
                $request->input('full_name'),
                'Thanh toán vé xe thành công',
                'checkout-success',
                $getBill->code_bill,
                $request->input('start_location'),
                $request->input('end_location'),
                $request->input('start_time'),
                $request->input('code_seat')
            ));
            return response()->json(['message' => 'Cập nhật đơn hàng thành công','bill' => $getBill]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật hóa đơn', 'error' => $e->getMessage()]);
        }
        
    }

    public function updateAdmin(Request $request, $id)
    {
        try {
            $request->validate([
                'status_pay' => 'required',
            ]);
    
            $bill = Bill::find($id);
    
            if (!$bill) {
                return response()->json(['message' => 'Bill not found'], 404);
            }
    
            $bill->discount_code_id = $request->input('discount_code_id') ? $request->input('discount_code_id') : $bill->discount_code_id;
            $bill->seat_id = $request->input('seat_id') ? $request->input('seat_id') : $bill->seat_id;
            $bill->trip_id = $request->input('trip_id') ? $request->input('trip_id') : $bill->trip_id;
            $bill->user_id = $request->input('user_id') ? $request->input('user_id') : $bill->user_id;
            $bill->status_pay = $request->input('status_pay') ? $request->input('status_pay') : $bill->status_pay;
            $bill->total_money = $request->input('total_money') ? $request->input('total_money') : $bill->total_money;
            $bill->total_money_after_discount = $request->input('total_money_after_discount') ? $request->input('total_money_after_discount') : $bill->total_money_after_discount;
            $bill->type_pay = $request->input('type_pay') ? $request->input('type_pay') : $bill->type_pay;
            $bill->total_seat = $request->input('total_seat') ? $request->input('total_seat') : $bill->total_seat;
            $bill->full_name = $request->input('full_name') ? $request->input('full_name') : $bill->full_name;
            $bill->email = $request->input('email') ? $request->input('email') : $bill->email;
            $bill->phone_number = $request->input('phone_number') ? $request->input('phone_number') : $bill->phone_number;

            $bill->save();
            $getBill = Bill::with('discountCode', 'seat', 'trip', 'user', 'ticketOrder')->find($bill->id);
            return response()->json(['message' => 'Cập nhật đơn hàng thành công','bill' => $getBill]);
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
