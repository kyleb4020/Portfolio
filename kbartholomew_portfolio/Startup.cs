using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(kbartholomew_portfolio.Startup))]
namespace kbartholomew_portfolio
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
