<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeCar extends Model
{
    use HasFactory;

    protected $table = 'Type_cars';

    public function Car()
    {
        return $this->hasMany(Car::class);
    }

}