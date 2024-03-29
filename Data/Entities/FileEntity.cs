﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class FileEntity
    {
        [Key]
        public int Id { get; set; }

        public string FileName { get; set; }
        public byte[] Data { get; set; }
        public string FileDescription { get; set; }
        public virtual TrackInfo? Track { get; set; }
    }
}