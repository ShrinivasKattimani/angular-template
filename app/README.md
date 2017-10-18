Server ID   Server              IP                                      URL

0S          Local               192.168.26.11                           http://192.168.26.11
1S          Staging             app031azrare.cloudapp.net:59828         http://bluestage.petrofac.com
2S          Dev Azure           10.139.0.4                              http://app006azrare.cloudapp.net:7095
3S          Production          10.141.32.221                           https://pfcapps.petrofac.com
4S          On-prem Prod        10.141.51.231                           http://10.141.51.231

______________________________________________________________________________________________________________________________

File                                Configuration

modules/appConfig.js                ClientId        0S, 1S, 3S, 4S: 82274cbc-77ef-49de-8808-505d97de1af0
                                                    2S: 65014dbc-4f1c-4613-94a1-b9be815a4cb5

                                    Endpoints       0S: {
                                                            "graph.microsoft.com": "graph.microsoft.com",
                                                            "http://192.168.26.11/api/wfm/api/": "https://bluestage.petrofac.com/wfm_api",
                                                            "http://192.168.26.11/":  "https://bluestage.petrofac.com/ess_api",
                                                            "https://api.powerbi.com": "https://analysis.windows.net/powerbi/api"
                                                        }
                                                    1S, 2S, 3S, 4S: {
                                                            "graph.microsoft.com": "graph.microsoft.com",
                                                            "http://app035azrare.cloudapp.net/": "https://bluestage.petrofac.com/wfm_api",
                                                            "http://app037azrare.cloudapp.net/":  "https://bluestage.petrofac.com/ess_api",
                                                            "https://api.powerbi.com": "https://analysis.windows.net/powerbi/api"
                                                        }

modules/shared/apiModules/apiConstants.js
                                    ssaEndPoint     0S: "http://192.168.26.11/api/SelfService/V1.0/Users/"
                                                    1S, 2S, 3S, 4S:
                                                        "http://app037azrare.cloudapp.net/api/SelfService/V1.0/Users/"

modules/shared/feedbackModule/feedbackDirective.js
                                    feedbackEndpoint 0S: "http://app036azrare.cloudapp.net/feedback/api/"
                                                    1S, 2S, 3S, 4S: "http://app036azrare.cloudapp.net/feedback/api/"

______________________________________________________________________________________________________________________________