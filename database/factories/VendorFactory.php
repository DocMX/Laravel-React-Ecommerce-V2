<?php

namespace Database\Factories;

use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\VendorStatusEnum;

class VendorFactory extends Factory
{
    protected $model = Vendor::class;

    public function definition(): array
    {
        return [
            // Puedes usar Faker para generar datos por defecto
            'status' => VendorStatusEnum::Approved,
            'store_name' => $this->faker->company(),
            'store_address' => $this->faker->address(),
            // No pongas 'user_id' aquí porque lo asignarás en el seeder
        ];
    }
}
