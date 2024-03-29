﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    [Table("TrackInfo")]
    public class TrackInfo
    {
        [Key]
        public int Id { get; set; }

        public string TrackName { get; set; }
        public string Band { get; set; }
        public string Genre { get; set; }
        public string LinkToCover { get; set; }
        public string LinkToTabs { get; set; }
        public virtual ICollection<FileEntity>? FileEntities { get; set; }
        //public virtual ICollection<PlaylistTracks> PlaylistTracks { get; set; }
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}