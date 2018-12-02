<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Libraries\GitHub;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(App\Libraries\GitHub::class, function ($app) {
            return new GitHub();
        });
    }
}
