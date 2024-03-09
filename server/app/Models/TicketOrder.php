<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'status', // Add the 'status' field to the fillable array
        // Add other fillable fields if any
    ];

    protected $table = 'ticket_orders';

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

    public function seat()
    {
        return $this->belongsTo(Seat::class);
    }
}
