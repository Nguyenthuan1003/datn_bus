<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Authenticatable implements JWTSubject, CanResetPasswordContract
{
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $dates = ['deleted_at'];

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
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime'
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
