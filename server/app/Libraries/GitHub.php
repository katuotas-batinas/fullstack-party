<?php
namespace App\Libraries;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;
use Exception;

class GitHub
{

    private $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    /**
    * Get GitHub authorization url
    *
    * @param array $options
    *
    * @return string
    */
    public function getAuthorizationUrl($options)
    {
        $defaultOptions = [
            'client_id' => env('GITHUB_CLIENT_ID'),
        ];

        $options = array_merge($defaultOptions, $options);

        $query = http_build_query($options);

        $authorizationUrl = 'https://github.com/login/oauth/authorize' . '?' . $query;

        return $authorizationUrl;
    }

    /**
    * Get GitHub API access token
    *
    * @param array $options
    *
    * @return string
    */
    public function getAccessToken($options)
    {
        $defaultOptions = [
            'client_id' => env('GITHUB_CLIENT_ID'),
            'client_secret' => env('GITHUB_CLIENT_SECRET'),
        ];

        $options = array_merge($defaultOptions, $options);

        $results = null;

        $requestUrl = 'https://github.com/login/oauth/access_token';

        try {
            $response = $this->client->post($requestUrl, [
                'json' => $options
            ]);

            parse_str($response->getBody()->getContents(), $results);
        } catch(RequestException $e) {
            throw new Exception($e->getResponse()->getReasonPhrase());
        }

        if(!isset($results['access_token'])) {
            throw new Exception($results['error_description']);
        }

        return $results['access_token'];
    }

    /**
    * Get list of issues assigned to user
    *
    * @param array $options
    *
    * @return array
    */
    public function getIssues($options)
    {
        $defaultOptions = [
            'client_id' => env('GITHUB_CLIENT_ID'),
            'per_page' => 10,
        ];

        $options = array_merge($defaultOptions, $options);

        $results = null;

        $requestUrl = 'https://api.github.com/issues';

        try {
            $response = $this->client->get($requestUrl, [
                'query' => $options,
            ]);

            // Parse links header and create pagination

            $links = Psr7\parse_header($response->getHeader('Link'));

            $pagination = null;

            if(isset($links[1]))
            {
                $lastPage = $options['page'];

                if($links[1]['rel'] === 'last')
                {
                    parse_str($links[1][0], $lastLink);

                    $lastPage = (int) filter_var($lastLink['page'], FILTER_SANITIZE_NUMBER_INT);
                }

                $pagination = [
                    'currentPage' => isset($options['page']) ? $options['page'] : 1,
                    'lastPage' => $lastPage,
                ];
            }

            $results = [
                'data' => json_decode($response->getBody()->getContents()),
                'pagination' => $pagination,
            ];
        } catch(RequestException $e) {
            throw new Exception($e->getResponse()->getReasonPhrase());
        }

        return $results;
    }


    /**
    * Get single issue
    *
    * @param array $options
    *
    * @return object
    */
    public function getIssue($options)
    {
        $results = null;

        $requestUrl = implode('/', [
            'https://api.github.com/repos',
            $options['owner'],
            $options['repo'],
            'issues',
            $options['number'],
        ]);

        try {
            $response = $this->client->get($requestUrl, [
                'query' => [
                    'access_token' => $options['access_token'],
                ]
            ]);

            $results = json_decode($response->getBody()->getContents());
        } catch(RequestException $e) {
            throw new Exception($e->getResponse()->getReasonPhrase());
        }

        // Load comments

        if($results->comments)
        {
            try {
                $response = $this->client->get($results->comments_url, [
                    'query' => [
                        'access_token' => $options['access_token'],
                    ]
                ]);

                $results->comments_entries = json_decode($response->getBody()->getContents());
            } catch(RequestException $e) {
                throw new Exception($e->getResponse()->getReasonPhrase());
            }
        }

        return $results;
    }
}
