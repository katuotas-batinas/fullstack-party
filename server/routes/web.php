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

$router->get('/authorize', function (Request $request) use ($router) {
  if(!$request->input('code')) {
    return redirect('/');
  }

  $client = new Client();

  $results = null;

  $requestUrl = 'https://github.com/login/oauth/access_token';

  try {
    $response = $client->post($requestUrl, [
      'json' => [
        'client_id' => env('GITHUB_CLIENT_ID'),
        'client_secret' => env('GITHUB_CLIENT_SECRET'),
        'code' => $request->input('code'),
        'redirect_uri' => url('/'),
      ]
    ]);
    
    parse_str($response->getBody()->getContents(), $results);
  } catch(RequestException $e) {
    return redirect('/');
  }

  if(!$results || !isset($results['access_token'])) {
    return redirect('/');
  }

  $request->session()->put('access_token', $results['access_token']);

  return redirect('/');
});

$router->get('/logout', function(Request $request) {
  $request->session()->flush();

  return redirect('/');
});

$router->get('/api/config', function (Request $request) use ($router) {
    $query = http_build_query([
      'client_id' => env('GITHUB_CLIENT_ID'),
      'redirect_uri' => url('authorize'),
      'scope' => 'user public_repo',
    ]);

    $authorizationUrl = 'https://github.com/login/oauth/authorize' . '?' . $query;

    return response()->json([
      'authorizationUrl' => $authorizationUrl,
      'accessToken' => $request->session()->get('access_token'),
    ]);
});

$router->get('/api/issues', function (Request $request) use ($router) {
  $client = new Client();

  $results = null;

  $requestUrl = 'https://api.github.com/issues';

  try {
    $response = $client->get($requestUrl, [
      'query' => [
        'access_token' => $request->session()->get('access_token'),
      ]
    ]);

    $results = json_decode($response->getBody()->getContents());
  } catch(RequestException $e) {
    return response([
      'message' => $e->getResponse()->getReasonPhrase(),
    ], $e->getResponse()->getStatusCode());
  }

  return response()->json($results);
});

$router->get('/api/issue', function (Request $request) use ($router) {
  $this->validate($request, [
    'owner' => 'required',
    'repo' => 'required',
    'number' => 'required',
  ]);

  $client = new Client();

  $results = null;

  $requestUrl = implode('/', [
    'https://api.github.com/repos',
    $request->input('owner'),
    $request->input('repo'),
    'issues',
    $request->input('number'),
  ]);

  try {
    $response = $client->get($requestUrl, [
      'query' => [
        'access_token' => $request->session()->get('access_token'),
      ]
    ]);

    $results = json_decode($response->getBody()->getContents());
  } catch(RequestException $e) {
    return response([
      'message' => $e->getResponse()->getReasonPhrase(),
    ], $e->getResponse()->getStatusCode());
  }

  return response()->json($results);
});

$router->get('{all:.*}', function ($path) use ($router) {
  return file_get_contents($router->app->basePath('public/client/index.html'));
});
