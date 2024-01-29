<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeDiscountCode extends Model
{
    use HasFactory;

    protected $table = 'type_discount_codes';

    public function discountCode() {
        return $this->hasMany(DiscountCode::class);
    }
}
