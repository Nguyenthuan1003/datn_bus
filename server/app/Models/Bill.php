<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;

    protected $table = 'bills';

    public function discountCode() {
        return $this->belongsTo(DiscountCode::class, 'discount_code_id');
    }

    public function seat() {
        return $this->belongsTo(Seat::class, 'seat_id');
    }

    public function trip() {
        return $this->belongsTo(Trip::class, 'trip_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function ticketOrder() {
        return $this->hasMany(TicketOrder::class);
    }
}
