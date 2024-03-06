<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $table = 'trips';

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function route()
    {
        return $this->belongsTo(Route::class);
    }

    public function bill() {
        return $this->hasMany(Bill::class);
    }

    //    public function bills()
//    {
//        return $this->hasMany(Bill::class);
//    }
//
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
//
//    public function driver()
//    {
//        return $this->belongsTo(User::class, 'drive_id');
//    }
//
//    public function assistant()
//    {
//        return $this->belongsTo(User::class, 'assistant_car_id');
//    }
}
