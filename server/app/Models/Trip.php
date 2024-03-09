<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $table = 'trips';

    public function route()
    {
        return $this->belongsTo(Route::class, 'route_id');
    }

    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id');
    }

    public function bill()
    {
        return $this->hasMany(Bill::class);
    }

    public function comment()
    {
        return $this->hasMany(Comment::class);
    }
}
