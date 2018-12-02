<?php

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/config', function (Request $request) use ($router) {
    $query = http_build_query([
      'client_id' => env('GITHUB_CLIENT_ID'),
      'redirect_uri' => url('authorize'),
      'scope' => 'user',
    ]);

    $authorizationUrl = 'https://github.com/login/oauth/authorize' . '?' . $query;

    return response()->json([
      'authorizationUrl' => $authorizationUrl,
    ]);
});

$router->get('/authorize', function (Request $request) use ($router) {

  $client = new Client();

  $results = null;

  try {
    $response = $client->post('https://github.com/login/oauth/access_token', [
      'json' => [
        'client_id' => env('GITHUB_CLIENT_ID'),
        'client_secret' => env('GITHUB_CLIENT_SECRET'),
        'code' => $request->input('code'),
        'redirect_uri' => url('/'),
      ]
    ]);

    parse_str($response->getBody()->getContents(), $results);
  } catch(RequestException $e) {
    return redirect('/login');
  }

  if(!$results || !isset($results['access_token'])) {
    return redirect('/login');
  }

  $request->session()->put('access_token', $results['access_token']);

  return redirect('/');
});

$router->get('{all:.*}', function ($path) use ($router) {
  return file_get_contents($router->app->basePath('public/client/index.html'));
});
