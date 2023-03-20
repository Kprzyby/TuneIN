﻿using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.Library
{
    public class TrackViewModel
    {
        public int Id { get; set; }
        public int MbId { get; set; }
        public string TrackName { get; set; }
        public string Band { get; set; }   
        public string Genre { get; set; }
        public string LinkToCover { get; set; }   


    }
}
