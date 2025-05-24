<?php

namespace App\Models;

use App\Enums\VendorStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vendor extends Model
{

     use HasFactory;
    //I added this 

    protected $primaryKey = 'user_id';

    public function scopeElegibleForPayout(Builder $query): Builder
    {
        return $query->where('status', VendorStatusEnum::Approved);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
