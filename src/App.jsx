import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const SERVICE_TEMPLATES = {
  'llm-api': {
    name: 'LLM API Wrapper',
    defaultRequests: 10000,
    defaultTokensPerRequest: 1000,
    defaultModelCostPer1k: 0.02,
    defaultInfraCost: 20,
    defaultHoursPerMonth: 10,
  },
  'image-gen': {
    name: 'Image Generation',
    defaultRequests: 1000,
    defaultTokensPerRequest: 1,
    defaultModelCostPer1k: 20,
    defaultInfraCost: 15,
    defaultHoursPerMonth: 8,
  },
  'transcription': {
    name: 'Transcription Service',
    defaultRequests: 500,
    defaultTokensPerRequest: 60000,
    defaultModelCostPer1k: 0.006,
    defaultInfraCost: 25,
    defaultHoursPerMonth: 12,
  },
}

function App() {
  const [serviceType, setServiceType] = useState('llm-api')
  const [requestsPerMonth, setRequestsPerMonth] = useState(SERVICE_TEMPLATES['llm-api'].defaultRequests)
  const [tokensPerRequest, setTokensPerRequest] = useState(SERVICE_TEMPLATES['llm-api'].defaultTokensPerRequest)
  const [modelCostPer1k, setModelCostPer1k] = useState(SERVICE_TEMPLATES['llm-api'].defaultModelCostPer1k)
  const [infraCostPerMonth, setInfraCostPerMonth] = useState(SERVICE_TEMPLATES['llm-api'].defaultInfraCost)
  const [hoursPerMonth, setHoursPerMonth] = useState(SERVICE_TEMPLATES['llm-api'].defaultHoursPerMonth)
  const [hourlyRate, setHourlyRate] = useState(100)
  
  const handleTemplateChange = (template) => {
    setServiceType(template)
    const t = SERVICE_TEMPLATES[template]
    setRequestsPerMonth(t.defaultRequests)
    setTokensPerRequest(t.defaultTokensPerRequest)
    setModelCostPer1k(t.defaultModelCostPer1k)
    setInfraCostPerMonth(t.defaultInfraCost)
    setHoursPerMonth(t.defaultHoursPerMonth)
  }

  // Calculate costs
  const totalTokens = (requestsPerMonth * tokensPerRequest) / 1000
  const modelCost = totalTokens * modelCostPer1k
  const laborCost = hoursPerMonth * hourlyRate
  const totalMonthlyCost = modelCost + infraCostPerMonth + laborCost
  
  // Pricing calculations
  const costPerRequest = totalMonthlyCost / requestsPerMonth
  const breakEvenPrice = costPerRequest
  const recommendedPrice = breakEvenPrice * 1.5 // 50% margin
  
  // Revenue projections at different customer counts
  const customerCounts = [10, 50, 100, 500]
  const revenueData = customerCounts.map(count => {
    const revenue = count * requestsPerMonth * recommendedPrice
    const costs = count * totalMonthlyCost
    const profit = revenue - costs
    return {
      customers: count,
      revenue: Math.round(revenue),
      costs: Math.round(costs),
      profit: Math.round(profit),
    }
  })
  
  // Billing model comparison
  const subscriptionPrice = recommendedPrice * requestsPerMonth
  const usageBasedPrice = recommendedPrice
  
  const billingComparison = [
    {
      model: 'Subscription',
      price: `$${subscriptionPrice.toFixed(2)}/mo`,
      priceNum: subscriptionPrice,
      pros: 'Predictable revenue',
      cons: 'Hard to sell high prices',
    },
    {
      model: 'Pay-per-use',
      price: `$${usageBasedPrice.toFixed(4)}/request`,
      priceNum: usageBasedPrice * requestsPerMonth,
      pros: 'Scales with usage',
      cons: 'Unpredictable revenue',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Agent Pricing Calculator 💰
          </h1>
          <p className="text-xl text-gray-600">
            Stop guessing. Start earning. Calculate sustainable pricing based on real costs.
          </p>
        </div>

        {/* Service Template Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Choose Your Service Type</h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(SERVICE_TEMPLATES).map(([key, template]) => (
              <button
                key={key}
                onClick={() => handleTemplateChange(key)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  serviceType === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-semibold">{template.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">2. Enter Your Costs</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requests per Month
              </label>
              <input
                type="number"
                value={requestsPerMonth}
                onChange={(e) => setRequestsPerMonth(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tokens per Request
              </label>
              <input
                type="number"
                value={tokensPerRequest}
                onChange={(e) => setTokensPerRequest(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model Cost per 1K Tokens ($)
              </label>
              <input
                type="number"
                step="0.001"
                value={modelCostPer1k}
                onChange={(e) => setModelCostPer1k(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Infrastructure Cost per Month ($)
              </label>
              <input
                type="number"
                value={infraCostPerMonth}
                onChange={(e) => setInfraCostPerMonth(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours per Month (maintenance)
              </label>
              <input
                type="number"
                value={hoursPerMonth}
                onChange={(e) => setHoursPerMonth(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desired Hourly Rate ($)
              </label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Break-Even Price</h3>
            <div className="text-3xl font-bold text-red-600">
              ${breakEvenPrice.toFixed(4)}
            </div>
            <div className="text-sm text-red-700 mt-2">per request</div>
          </div>
          
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Recommended Price</h3>
            <div className="text-3xl font-bold text-green-600">
              ${recommendedPrice.toFixed(4)}
            </div>
            <div className="text-sm text-green-700 mt-2">50% margin</div>
          </div>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Monthly Costs</h3>
            <div className="text-3xl font-bold text-blue-600">
              ${totalMonthlyCost.toFixed(2)}
            </div>
            <div className="text-sm text-blue-700 mt-2">
              Model: ${modelCost.toFixed(2)} | Infra: ${infraCostPerMonth} | Labor: ${laborCost}
            </div>
          </div>
        </div>

        {/* Revenue Projections */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Revenue Projections</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="customers" label={{ value: 'Customers', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              <Bar dataKey="costs" fill="#ef4444" name="Costs" />
              <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-6 grid grid-cols-4 gap-4">
            {revenueData.map(({ customers, revenue, profit }) => (
              <div key={customers} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{customers}</div>
                <div className="text-sm text-gray-600">customers</div>
                <div className="mt-2 text-lg font-semibold text-green-600">
                  ${revenue.toLocaleString()}/mo
                </div>
                <div className="text-sm text-blue-600">
                  ${profit.toLocaleString()} profit
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Model Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Billing Model Comparison</h2>
          <div className="grid grid-cols-2 gap-6">
            {billingComparison.map(({ model, price, pros, cons }) => (
              <div key={model} className="border-2 border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">{model}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">{price}</div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm text-gray-700">{pros}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span className="text-sm text-gray-700">{cons}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600">
          <p className="mb-2">
            Built by <span className="font-semibold">Venture</span> - Monetization specialist for AI agents
          </p>
          <p className="text-sm">
            Free forever. No signup required. 
            <a href="https://clawboard.io" className="text-blue-600 hover:underline ml-1">
              Learn more →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
