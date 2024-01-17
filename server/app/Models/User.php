<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'users';

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function userType()
    {
        return $this->belongsTo(UserType::class);
    }
}
