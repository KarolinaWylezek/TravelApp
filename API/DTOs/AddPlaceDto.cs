namespace API.DTOs
{
    public class AddPlaceDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string OpenTime { get; set; }
        public string CloseTime { get; set; }
        public string Theme { get; set; }
        public string Subtheme { get; set; }
        public string ExpectedTimeSpent { get; set; }
    }
}