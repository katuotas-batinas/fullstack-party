<?php

use Illuminate\Http\Request;
use App\Libraries\GitHub;

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

$router->get('/authorize', function (Request $request, GitHub $github) {
    try {
        $accessToken = $github->getAccessToken([
            'code' => $request->input('code')
        ]);

        $request->session()->put('access_token', $accessToken);

        return redirect('/issues');
    } catch(Exception $e) {
        return redirect('/login');
    }
});

$router->get('/logout', function(Request $request) {
    $request->session()->flush();

    return redirect('/login');
});

$router->get('/api/config', function (Request $request, GitHub $github) {
    $authorizationUrl = $github->getAuthorizationUrl([
        'redirect_uri' => url('authorize'),
        'scope' => 'user public_repo',
    ]);

    return response()->json([
        'authorizationUrl' => $authorizationUrl,
        'isLoggedIn' => $request->session()->get('access_token') ? true : false,
    ]);
});

$router->get('/api/issues', function (Request $request, GitHub $github) {
    try {
        $issues = $github->getIssues([
            'access_token' => $request->session()->get('access_token')
        ]);

        return response()->json($issues);
    } catch(Exception $e) {
        return response()->json(['message' => $e->getMessage()], 400);
    }
});

$router->get('/api/issue', function (Request $request, GitHub $github) {
    $this->validate($request, [
        'owner' => 'required',
        'repo' => 'required',
        'number' => 'required',
    ]);

    try {
        $issue = $github->getIssue([
            'owner' => $request->input('owner'),
            'repo' => $request->input('repo'),
            'number' => $request->input('number'),
            'access_token' => $request->session()->get('access_token'),
        ]);

        return response()->json($issue);
    } catch(Exception $e) {
        return response()->json(['message' => $e->getMessage()], 400);
    }
});

$router->get('{all:.*}', function ($path) use ($router) {
    return file_get_contents($router->app->basePath('public/client/index.html'));
});
