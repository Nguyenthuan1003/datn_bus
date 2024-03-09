<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'user_type_id',
        'role_id',
        'email',
        'name',
        'password',
        'phone_number',
        'address',
        'description',
        'location',
        'avatar'
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function typeUser()
    {
        return $this->belongsTo(TypeUser::class, 'user_type_id');
    }

    public function comment()
    {
        return $this->hasMany(Comment::class);
    }

    public function bill()
    {
        return $this->hasMany(Bill::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
