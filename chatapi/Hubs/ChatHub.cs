using chatapi.Services;
using Microsoft.AspNetCore.SignalR;

namespace chatapi.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ChatService _chatService;
        public ChatHub(ChatService chatService)
        {
            _chatService = chatService;
           
        }
        public override async Task OnConnectedAsync()
        {
            
            await Groups.AddToGroupAsync(Context.ConnectionId, "come&chat");
            await Clients.Caller.SendAsync("UserConnected");
        }

        public override async Task OnDisconnectedAsync(Exception e)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "come&chat");
            await base.OnDisconnectedAsync(e);
        }
    }
}
