<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscountCode extends Model
{
    use HasFactory;

    protected $table = 'discount_codes';

    public function typeDiscountCode() {
        return $this->belongsTo(TypeDiscountCode::class, 'id_discount_code');
    }

    public function bill() {
        return $this->hasMany(Bill::class);
    }
}
