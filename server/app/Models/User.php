<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'users';

    public function typeUser() {
        return $this->belongsTo(TypeUser::class, 'user_type_id');
    }

    public function comment() {
        return $this->hasMany(Comment::class);
    }

    public function bill() {
        return $this->hasMany(Bill::class);
    }

    public function role() {
        return $this->belongsTo(Role::class);
    }
}
