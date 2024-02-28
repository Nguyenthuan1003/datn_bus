<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentLocation extends Model
{
    use HasFactory;

    protected $table = 'parent_locations';

    public function location() {
        return $this->hasMany(Location::class);
    }

    public function route() {
        return $this->hasMany(Route::class);
    }
}
