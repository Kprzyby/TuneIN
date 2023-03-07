﻿using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels.Library
{
    public class TrackViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Band { get; set; }   

        public string Genre { get; set; }

        public string CoverLink { get; set; }   


    }
}
