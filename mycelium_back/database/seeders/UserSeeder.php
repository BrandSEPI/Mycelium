<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;


class UserSeeder extends Seeder
{

    public function run()
    {
        User::create([
            'username' => 'admin', 'email' => 'admin@example.com', 'password' => bcrypt('admin'), 'phone' => '0655478903', 'admin' => '1',
        ]);

        User::create([
            'username' => 'Tony', 'email' => 'tony@example.com', 'password' => bcrypt('tony'), 'phone' => '0655478900', 'admin' => '0'
        ]);
    }
}
