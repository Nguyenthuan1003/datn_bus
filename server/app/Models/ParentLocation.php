<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParentLocation extends Model
{

    protected $table = 'parent_location';

    public function location()
    {
        return $this->hasMany(Location::class);
    }

}
