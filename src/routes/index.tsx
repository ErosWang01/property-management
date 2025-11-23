import { createFileRoute } from '@tanstack/react-router';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Cash Flow
import CalculateIcon from '@mui/icons-material/Calculate'; // Calculator
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Forecast
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Gearing/Tax
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from '@tanstack/react-router'; // <-- 引入 TanStack Link

const HomePage = () => {
  // const theme = useTheme();

  // Custom "Cool" Palette
  const primaryDark = '#003366'; // Deep Navy Blue
  const accentCyan = '#00bcd4'; // Vibrant Cyan/Teal
  const spacingUnit = 2; // Equivalent to MUI spacing(2) which is 16px (used for padding/margin)

  // --- Content Data (English) ---
  const painPoints = [
    {
      icon: <AttachMoneyIcon color="primary" />,
      title: 'Monthly Cash Flow Status?',
      text: '“Will this property be Cash Flow Positive or Negative on a month-to-month basis?”',
    },
    {
      icon: <AccountBalanceWalletIcon color="primary" />,
      title: 'Annual Tax Benefit?',
      text: '“How much tax savings (Negative Gearing) can I claim each year?”',
    },
    {
      icon: <TrendingUpIcon color="primary" />,
      title: 'Depreciation Impact?',
      text: '“How does Depreciation factor into the real holding cost?”',
    },
    {
      icon: <CalculateIcon color="primary" />,
      title: 'Tired of Spreadsheets?',
      text: '“Manual Excel sheets are too time-consuming, complex, and prone to costly errors.”',
    },
  ];

  const features = [
    {
      icon: <CalculateIcon sx={{ color: accentCyan }} fontSize="large" />,
      title: 'Comprehensive Cash Flow',
      text: 'Instantly see all income (rent) vs. expenditure (loan, fees, maintenance) to predict annual profit or loss.',
    },
    {
      icon: (
        <AccountBalanceWalletIcon sx={{ color: accentCyan }} fontSize="large" />
      ),
      title: 'Precise Negative Gearing',
      text: 'Automatically factor in interest, council rates, and depreciation to maximize your tax deduction.',
    },
    {
      icon: <TrendingUpIcon sx={{ color: accentCyan }} fontSize="large" />,
      title: 'Multi-Year Forecasting',
      text: 'Forecast your property’s performance over 5 or 10 years, allowing for robust scenario planning.',
    },
    {
      icon: <AttachMoneyIcon sx={{ color: accentCyan }} fontSize="large" />,
      title: 'Intuitive Interface',
      text: 'Get professional-grade reports without needing complex financial knowledge. Simple inputs, powerful outputs.',
    },
  ];

  return (
    <Box sx={{ bgcolor: '#fafafa' }}>
      {/* 1. Hero Section */}
      <Box
        id="hero"
        sx={{
          bgcolor: primaryDark,
          color: 'white',
          py: { xs: 10, md: 15 },
          textAlign: 'center',
          backgroundImage: `linear-gradient(135deg, ${primaryDark} 0%, #00509e 100%)`,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-1px',
            }}
          >
            Stop Guessing. Calculate Your True Australian Property Cash Flow &
            Negative Gearing Advantage.
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9 }}>
            Use the free online calculator trusted by Aussie property experts to
            accurately forecast 10-year Cash Flow and Negative Gearing impact.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/calculator"
            endIcon={<ArrowRightAltIcon />}
            sx={{
              bgcolor: accentCyan,
              color: primaryDark,
              py: 2,
              px: 6,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#00a9bd',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 188, 212, 0.5)',
              },
            }}
          >
            Get Started Free Now
          </Button>
        </Container>
      </Box>

      {/* 2. Pain Points/Problems - 使用 Box Flex 替代 Grid */}
      <Box component="section" sx={{ py: 10, bgcolor: '#f0f8ff' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            ❓ Are These Your Biggest Investment Concerns?
          </Typography>

          {/* Flex 容器：mx: -spacingUnit 模拟负边距 */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              mx: -spacingUnit,
            }}
          >
            {painPoints.map((point, index) => (
              // Flex item：px: spacingUnit 模拟间距，width 模拟响应式列宽
              <Box
                key={index}
                sx={{
                  width: { xs: '100%', sm: '50%', md: '25%' },
                  p: spacingUnit,
                  boxSizing: 'border-box', // 确保 padding 不增加实际宽度
                }}
              >
                <Card
                  elevation={4}
                  sx={{
                    height: '100%',
                    textAlign: 'left',
                    borderTop: `4px solid ${primaryDark}`,
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
                    >
                      {point.icon}
                      <Typography
                        variant="subtitle1"
                        component="h3"
                        sx={{ ml: 1, fontWeight: 600 }}
                      >
                        {point.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {point.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 3. Features & Benefits - 使用 Box Flex 替代 Grid */}
      <Box component="section" sx={{ py: 10 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            💡 The Tool Built for Australian Investors
          </Typography>

          {/* Flex 容器：mx: -spacingUnit 模拟负边距 */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              mx: -spacingUnit,
            }}
          >
            {features.map((feature, index) => (
              // Flex item：px: spacingUnit 模拟间距，width 模拟响应式列宽
              <Box
                key={index}
                sx={{
                  width: { xs: '100%', sm: '50%', md: '25%' },
                  p: spacingUnit,
                  boxSizing: 'border-box',
                }}
              >
                <Card
                  elevation={6}
                  sx={{
                    height: '100%',
                    p: 2,
                    transition:
                      'box-shadow 0.3s ease, background-color 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 10px 20px rgba(0, 51, 102, 0.2)`,
                      bgcolor: primaryDark,
                      '& *': { color: 'white !important' },
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2, '& svg': { color: accentCyan } }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      color="primary"
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 4. How It Works - 使用 Box Flex 替代 Grid */}
      <Box component="section" sx={{ py: 10, bgcolor: '#f0f8ff' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            🚀 3 Simple Steps to Unlock Your Investment Future
          </Typography>

          {/* Flex 容器：mx: -spacingUnit 模拟负边距 */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              mx: -spacingUnit,
            }}
          >
            {[
              {
                step: 1,
                title: 'Input Property Details',
                text: 'Enter purchase price, loan amount, rental expectations, and related expenditures.',
              },
              {
                step: 2,
                title: 'Instant Comprehensive Result',
                text: 'System immediately generates detailed annual cash flow, total negative gearing, and net holding cost.',
              },
              {
                step: 3,
                title: 'Make Your Decision',
                text: 'Download your report and confidently discuss your strategy with your accountant or broker.',
              },
            ].map((item) => (
              // Flex item：使用 33.333% 模拟三列布局
              <Box
                key={item.step}
                sx={{
                  width: { xs: '100%', sm: '33.333%' },
                  p: spacingUnit,
                  boxSizing: 'border-box',
                }}
              >
                <Card
                  elevation={4}
                  sx={{
                    height: '100%',
                    p: 3,
                    borderBottom: `4px solid ${accentCyan}`,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: accentCyan,
                      color: 'white',
                      borderRadius: '50%',
                      width: 60,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 4px 8px rgba(0, 188, 212, 0.4)',
                    }}
                  >
                    {item.step}
                  </Box>
                  <Typography
                    variant="h6"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 5. Footer CTA */}
      <Box
        component="section"
        sx={{
          bgcolor: primaryDark,
          color: 'white',
          py: { xs: 8, md: 10 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 800, mb: 3 }}
          >
            Don't Let Uncertainty Cost You Money.
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, opacity: 0.9 }}>
            Access your free Australian Property Investment Calculator now and
            make the smart move.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/calculator"
            endIcon={<ArrowRightAltIcon />}
            sx={{
              bgcolor: accentCyan,
              color: primaryDark,
              py: 2,
              px: 6,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#00a9bd',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 188, 212, 0.5)',
              },
            }}
          >
            Start Calculating Free &gt;
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <HomePage />
    </div>
  );
}
