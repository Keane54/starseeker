import { Gate, GetGateResponse, GetGatesListResponse, GetRouteResponse, GetTransportResponse } from '@/types/types';
import { http, HttpResponse } from 'msw'

export const mockGates: GetGatesListResponse = [
    {
      createdAt: '2023-09-29T12:34:56Z',
      uuid: '1',
      updatedAt: null,
      name: 'Gate 1',
      code: 'G1',
      links: [
        {
          hu: 'link1-hu',
          code: 'L1',
        },
      ],
    },
    {
      createdAt: '2023-09-30T12:34:56Z',
      uuid: '2',
      updatedAt: null,
      name: 'Gate 2',
      code: 'G2',
      links: [
        {
          hu: 'link2-hu',
          code: 'L2',
        },
      ],
    },
    {
      createdAt: '2023-10-01T12:34:56Z',
      uuid: '3',
      updatedAt: null,
      name: 'Gate 3',
      code: 'G3',
      links: [
        {
          hu: 'link3-hu',
          code: 'L3',
        },
      ],
    },
];

const API_URL = process.env.API_URL

export const handlers = [
    http.get<{}, null, GetGatesListResponse>(`${API_URL}/gates`, () => HttpResponse.json(mockGates)),
    http.get<{ gateCode: string }, null, GetGateResponse>(`${API_URL}/gates/:gateCode`, ({ params }) => {
        const { gateCode } = params

        const gate = mockGates.find((gate) => gate.code === gateCode)

        return HttpResponse.json(gate)
    }),
    http.get<{ fromGateCode: string, toGateCode: string }, null, GetRouteResponse>(`${API_URL}/gates/:fromGateCode/to/:toGateCode`, ({ params }) => {
        const { fromGateCode, toGateCode } = params

        return HttpResponse.json({
            from: mockGates.find((gate) => gate.code === fromGateCode) as Gate,
            to: mockGates.find((gate) => gate.code === toGateCode) as Gate,
            totalCost: '100',
            route: [
                fromGateCode,
                toGateCode
            ]
        })
    }),
    http.get<{ distance: string }, null, GetTransportResponse>(`${API_URL}/transport/:distance`, () => {
        return HttpResponse.json({
            currency: 'GBP',
            journeyCost: 100,
            parkingFee: 10,
            recommendedTransport: {
                capacity: 5,
                name: 'Test Transport',
                ratePerAu: 10
            }
        })
    })
]