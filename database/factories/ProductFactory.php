<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * @throws \Exception
     */
    public function definition()
    {
        return [
            'title' => $this->faker->text(10),
            'weight' => random_int(0, 1) ? random_int(1, 1000) : null,
            'price' => random_int(1, 10000),
            'description' => $this->faker->text,
            'category_id' => random_int(1,10),
            'image' => $this->faker->imageUrl(640, 480, 'animals', true),
        ];
    }
}
